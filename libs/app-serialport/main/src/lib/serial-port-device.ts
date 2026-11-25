/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PQueue, { TimeoutError } from "p-queue"
import {
  SerialPortDeviceInfo,
  SerialPortErrorType,
  SerialPortRequest,
  SerialPortResponse,
} from "app-serialport/models"
import { AppSerialportDeviceScanner } from "./app-serialport-device-scanner"
import { DeviceFreezeHandler } from "./helpers/device-freeze-handler"
import {
  SerialPortHandler,
  SerialPortHandlerMock,
  SerialPortHandlerOptions,
} from "app-serialport/devices"
import { AppLogger, SerialPortError } from "app-serialport/utils"
import { delay } from "app-utils/common"

const DEFAULT_QUEUE_INTERVAL = 10
const DEFAULT_QUEUE_CONCURRENCY = 1
const DEFAULT_QUEUE_INTERVAL_CAPACITY = 1
const DEFAULT_OPEN_RETRY_ATTEMPTS = 1
const WINDOWS_OPEN_RETRY_ATTEMPTS = 3
const WINDOWS_OPEN_RETRY_BASE_DELAY_MS = 300
const WINDOWS_OPEN_RETRY_MAX_DELAY_MS = 2_000
const REATTACH_AFTER_UNFREEZE_DELAY_MS = 250

export enum SerialPortDeviceStatus {
  /**
   * Default status when the device is created.
   * The device is being initialized and is not yet ready for requests.
   */
  DeviceInitializing = "DeviceInitializing",

  /**
   * SerialPort is opening or has been opened,
   * but the device is not yet active (not visible in the UI).
   */
  DeviceConnected = "DeviceConnected",

  /**
   * SerialPort is open and ready to handle requests,
   * and the device is active (visible in the UI).
   */
  DeviceActive = "DeviceActive",

  /**
   * The device is frozen due to expected disconnection (e.g., during a firmware update)
   * or unexpected issues (e.g., serial port errors).
   * Requests will be blocked until the device is Ready again or Disconnected.
   */
  DeviceFrozen = "DeviceFrozen",

  /**
   * SerialPort is closed, either due to disconnection or errors.
   * The device is not ready for requests and should be removed from the UI.
   */
  DeviceDisconnected = "DeviceDisconnected",
}

interface Options {
  queueInterval?: number
  queueConcurrency?: number
  queueIntervalCapacity?: number
  onConnect?: VoidFunction
  onDisconnect?: VoidFunction
  onOpenRetriesExhausted?: (error: Error) => void
}

/**
 * SerialPortDevice represents a single serial port device and manages its state, requests, and lifecycle.
 * It handles opening the serial port, managing a queue of requests, and emitting events for connection and disconnection.
 */
export class SerialPortDevice {
  status = SerialPortDeviceStatus.DeviceInitializing

  private requestsQueue: PQueue
  private requestsQueueAbortController = new AbortController()
  private readonly pendingRequestRejectors = new Set<(error: Error) => void>()
  private freezeHandler = new DeviceFreezeHandler()
  private serialPort?: SerialPortHandler | SerialPortHandlerMock
  private openRetryTimeout?: NodeJS.Timeout
  private reattachTimeout?: NodeJS.Timeout
  private hasConnectedOnce = false
  private hasBeenActivated = false
  private portInstanceId = 0
  private readonly instance:
    | typeof SerialPortHandler
    | typeof SerialPortHandlerMock

  constructor(
    public info: SerialPortDeviceInfo,
    private options?: Options
  ) {
    const instance = AppSerialportDeviceScanner.getMatchingInstance(info)

    if (!instance) {
      throw new Error(
        `No matching instance found for device at path ${info.path}.`
      )
    }
    this.instance = instance

    this.requestsQueue = new PQueue({
      concurrency: options?.queueConcurrency ?? DEFAULT_QUEUE_CONCURRENCY,
      interval: options?.queueInterval ?? DEFAULT_QUEUE_INTERVAL,
      intervalCap:
        options?.queueIntervalCapacity ?? DEFAULT_QUEUE_INTERVAL_CAPACITY,
      autoStart: false,
      timeout: this.instance.defaultRequestTimeout,
    })

    this.freezeHandler.on("freeze", () => {
      AppLogger.log("debug", `Device at path ${this.info.path} is frozen.`, {
        color: "yellow",
      })
      this.transition(SerialPortDeviceStatus.DeviceFrozen, "freeze")
    })

    this.freezeHandler.on("unfreeze", (reason) => {
      AppLogger.log(
        "debug",
        `Device at path ${this.info.path} is unfrozen. Reason: ${reason}.`,
        {
          color: reason === "timeout" ? "red" : "green",
        }
      )
      if (reason === "timeout") {
        this.handleDisconnect()
        return
      }

      if (this.serialPort?.isOpen) {
        this.transition(this.getResumeStatus(), "manual unfreeze")
        return
      }

      // The port never came back on its own. Whoever unfroze the device may be
      // about to re-attach it with fresh port info (that is what the scanner
      // does), so give that a moment before re-opening the known path. Either
      // way the device must not be left frozen with a paused queue.
      this.scheduleReattachAfterUnfreeze()
    })
  }

  /**
   * The single writer of `status`. The request queue state is derived from the
   * status here - and nowhere else - so the two can never disagree, which is what
   * used to leave a manually unfrozen device with a permanently paused queue.
   */
  private transition(next: SerialPortDeviceStatus, reason: string) {
    if (this.status === next) {
      return
    }

    if (
      this.status === SerialPortDeviceStatus.DeviceDisconnected &&
      next === SerialPortDeviceStatus.DeviceFrozen
    ) {
      // A disconnected device has nothing to freeze; it has to be re-attached first.
      return
    }

    const previous = this.status
    this.status = next

    AppLogger.log(
      "debug",
      `Device at path ${this.info.path}: ${previous} -> ${next} (${reason}).`,
      {
        color:
          next === SerialPortDeviceStatus.DeviceDisconnected ? "red" : "blue",
      }
    )

    switch (next) {
      case SerialPortDeviceStatus.DeviceConnected:
      case SerialPortDeviceStatus.DeviceActive:
        this.requestsQueue.start()
        break
      case SerialPortDeviceStatus.DeviceInitializing:
      case SerialPortDeviceStatus.DeviceFrozen:
        this.requestsQueue.pause()
        break
      case SerialPortDeviceStatus.DeviceDisconnected:
        // A non-serial device (MSC, mock) is not backed by a port, and `request()`
        // deliberately keeps serving it while disconnected. Pausing or clearing its
        // queue would accept requests that can never run; `destroy()` settles them.
        if (this.instance.nonSerialPortDevice) {
          break
        }
        this.requestsQueue.pause()
        this.failPendingRequests(
          new SerialPortError(SerialPortErrorType.PortClosed)
        )
        this.requestsQueue.clear()
        break
    }
  }

  /**
   * The status a device returns to once its port is usable again: a device that
   * was already visible in the UI stays visible instead of silently dropping back
   * to DeviceConnected.
   */
  private getResumeStatus() {
    return this.hasBeenActivated
      ? SerialPortDeviceStatus.DeviceActive
      : SerialPortDeviceStatus.DeviceConnected
  }

  /**
   * Registers a request as pending so it can be settled explicitly when the device
   * goes away. `PQueue.clear()` drops queued tasks without settling the promise
   * `add()` returned, so without this the caller - and the IPC reply behind it -
   * would wait for the lifetime of the process.
   */
  private trackPendingRequest() {
    let rejector!: (error: Error) => void

    const cancelled = new Promise<never>((_, reject) => {
      rejector = reject
    })
    // The race below may already have settled when the rejection lands.
    void cancelled.catch(() => undefined)

    this.pendingRequestRejectors.add(rejector)

    return {
      cancelled,
      release: () => {
        this.pendingRequestRejectors.delete(rejector)
      },
    }
  }

  private failPendingRequests(error: Error) {
    if (this.pendingRequestRejectors.size === 0) {
      return
    }

    const rejectors = [...this.pendingRequestRejectors]
    this.pendingRequestRejectors.clear()

    AppLogger.log(
      "warn",
      `Rejecting ${rejectors.length} pending request(s) for device at path ${this.info.path}.`,
      { color: "yellow" }
    )

    for (const reject of rejectors) {
      reject(error)
    }
  }

  private scheduleReattachAfterUnfreeze() {
    clearTimeout(this.reattachTimeout)
    this.reattachTimeout = setTimeout(() => {
      this.reattachTimeout = undefined

      if (
        this.serialPort?.isOpen ||
        this.status === SerialPortDeviceStatus.DeviceDisconnected
      ) {
        return
      }

      AppLogger.log(
        "debug",
        `Re-attaching port of device at path ${this.info.path} after a manual unfreeze.`,
        { color: "yellow" }
      )
      this.attachPort()
    }, REATTACH_AFTER_UNFREEZE_DELAY_MS)
  }

  /**
   * Handles disconnection of the device by updating the status, clearing the requests queue, and emitting the onDisconnect event.
   * This method is called when the serial port is closed and the device is not freezable, or when an error occurs while opening the port.
   */
  private handleDisconnect() {
    if (this.status === SerialPortDeviceStatus.DeviceDisconnected) {
      return
    }
    AppLogger.log("debug", `Device disconnected at path ${this.info.path}.`, {
      color: "yellow",
    })

    this.transition(SerialPortDeviceStatus.DeviceDisconnected, "disconnect")

    this.options?.onDisconnect?.()
  }

  /**
   * Handles the 'open' event of the serial port by updating the device status, flushing the port,
   * starting the requests queue, and emitting the onConnect event.
   */
  private handleOpen = () => {
    AppLogger.log("debug", `Serial port opened at path ${this.info.path}.`, {
      color: "green",
    })

    clearTimeout(this.openRetryTimeout)
    this.openRetryTimeout = undefined

    try {
      this.serialPort?.flush()
    } catch {
      //
    }

    this.transition(this.getResumeStatus(), "serial port opened")

    if (!this.hasConnectedOnce) {
      this.hasConnectedOnce = true
      this.options?.onConnect?.()
    }
  }

  /**
   * Handles the 'close' event of the serial port by checking if the device is freezable and either freezing it or disconnecting it.
   * If the device is freezable, it will transition to the DeviceFrozen state and block requests until it is unfrozen.
   * If the device is not freezable, it will transition to the DeviceDisconnected state and clear the requests queue.
   */
  private handleClose = () => {
    AppLogger.log("debug", `Serial port closed at path ${this.info.path}.`, {
      color: "yellow",
    })

    if (this.freezeHandler.isFreezable) {
      AppLogger.log(
        "debug",
        `Device at path ${this.info.path} is freezable. Freezing instead of disconnecting.`,
        {
          color: "yellow",
        }
      )
      this.freezeHandler.freeze()
      return
    }

    this.handleDisconnect()
  }

  /**
   * Attaches a serial port to the device by initializing the SerialPortHandler with the provided device info.
   * If the device is already attached to a serial port, it will be detached first before attaching the new one.
   */
  attachPort(
    info: SerialPortDeviceInfo = this.info,
    maxAttempts = this.getDefaultOpenRetryAttempts()
  ) {
    AppLogger.log("silly", `Attaching serial port device at path ${info.path}.`)
    clearTimeout(this.reattachTimeout)
    this.reattachTimeout = undefined
    this.info = info
    this.portInstanceId++

    if (this.serialPort) {
      this.detachPort()
    }

    this.createSerialPort(info.path, maxAttempts)
  }

  /**
   * Detaches the current serial port from the device by removing event listeners and closing the port if it's open.
   * This method is called when the device is being reinitialized with a new serial port or when the device is destroyed.
   * After detaching, the device will no longer have an associated serial port until attachPort is called again.
   */
  private detachPort() {
    if (!this.serialPort) {
      return
    }

    if (this.serialPort.isOpen) {
      try {
        this.serialPort.close()
      } catch {
        //
      }
    }

    this.serialPort.cleanup()
    this.serialPort = undefined
  }

  private getDefaultOpenRetryAttempts() {
    return process.platform === "win32"
      ? WINDOWS_OPEN_RETRY_ATTEMPTS
      : DEFAULT_OPEN_RETRY_ATTEMPTS
  }

  private isWindowsTransientOpenError(error: Error) {
    if (process.platform !== "win32") {
      return false
    }

    const message = error.message.toLowerCase()
    AppLogger.log(
      "error",
      `Checking if error ${message} is a transient Windows open error.`
    )
    return (
      message.includes("unknown error code 433") ||
      message.includes("file not found") ||
      message.includes("cannot find the file") ||
      message.includes("access denied") ||
      message.includes("operation aborted")
    )
  }

  private getWindowsOpenRetryDelayMs(attemptsLeft: number) {
    const maxAttempts = this.getDefaultOpenRetryAttempts()
    const retryIndex = Math.max(0, maxAttempts - attemptsLeft)
    return Math.min(
      WINDOWS_OPEN_RETRY_BASE_DELAY_MS * 2 ** retryIndex,
      WINDOWS_OPEN_RETRY_MAX_DELAY_MS
    )
  }

  /**
   * Creates a new SerialPortHandler instance for the device using the provided path and sets up event listeners for open, close, and error events.
   */
  private createSerialPort(
    path: SerialPortDeviceInfo["path"],
    maxAttempts = 1
  ) {
    const currentInstanceId = this.portInstanceId

    this.serialPort = new this.instance({
      path,
      autoOpen: false,
      onOpen: () => {
        if (currentInstanceId !== this.portInstanceId) {
          return
        }
        this.handleOpen()
      },
      onClose: () => {
        if (currentInstanceId !== this.portInstanceId) {
          return
        }
        this.handleClose()
      },
      onError: (error) => {
        if (currentInstanceId !== this.portInstanceId) {
          return
        }
        this.handleError(error, maxAttempts)
      },
    } as SerialPortHandlerOptions)

    if (!this.serialPort?.isOpen && !this.serialPort?.opening) {
      this.serialPort?.open((error) => {
        if (currentInstanceId !== this.portInstanceId || !error) {
          return
        }
        this.handleError(error, maxAttempts)
      })
    }
  }

  /**
   * Handles errors that occur while opening the serial port by logging the error and retrying to open the port if there are attempts left.
   * If there are no attempts left, it will handle the disconnection of the device.
   */
  private handleError(error: Error, attemptsLeft: number) {
    const isWindowsTransientOpenError = this.isWindowsTransientOpenError(error)

    AppLogger.log(
      "error",
      `Error opening serial port at path ${this.info.path}: ${
        error instanceof SerialPortError ? error.type : error.message
      }`
    )
    if (attemptsLeft <= 0) {
      this.options?.onOpenRetriesExhausted?.(error)
      this.handleDisconnect()
      return
    }

    const delayMs = isWindowsTransientOpenError
      ? this.getWindowsOpenRetryDelayMs(attemptsLeft)
      : 1_000

    AppLogger.log(
      "warn",
      `Retrying opening serial port at path ${this.info.path} in ${delayMs}ms. Attempts left: ${attemptsLeft - 1}.`,
      { color: "yellow" }
    )

    clearTimeout(this.openRetryTimeout)
    this.openRetryTimeout = setTimeout(() => {
      this.attachPort(this.info, attemptsLeft - 1)
    }, delayMs)
  }

  /**
   * Activates the device, allowing it to be visible in the UI and fully ready for use.
   * The device must be in the DeviceConnected state to be activated.
   */
  activate() {
    if (this.status === SerialPortDeviceStatus.DeviceConnected) {
      this.hasBeenActivated = true
      this.transition(SerialPortDeviceStatus.DeviceActive, "activate")
    } else {
      AppLogger.log(
        "warn",
        `Cannot activate device at path ${this.info.path} because it is not in the DeviceConnected state. Current status: ${this.status}`
      )
    }
  }

  /**
   * Destroys the device by closing the serial port and cleaning up resources.
   * The device will transition to the DeviceDisconnected state.
   */
  destroy() {
    AppLogger.log(
      "silly",
      `Destroying device at path ${this.info.path}. Closing serial port and cleaning up resources.`,
      { color: "red" }
    )

    try {
      clearTimeout(this.openRetryTimeout)
      this.openRetryTimeout = undefined
      clearTimeout(this.reattachTimeout)
      this.reattachTimeout = undefined
      this.freezeHandler.off()
      this.transition(SerialPortDeviceStatus.DeviceDisconnected, "destroy")
      this.failPendingRequests(
        new SerialPortError(SerialPortErrorType.PortClosed)
      )
      this.requestsQueue.clear()
      this.requestsQueueAbortController.abort()
    } catch {
      // do nothing
    }

    if (this.serialPort) {
      this.detachPort()
    }
  }

  /**
   * Internal method to make a request to the serial port.
   * This method is called by the requests queue and should not be called directly.
   * It ensures that the SerialPort is initialized before making the request.
   */
  private async makeRequest(
    request: SerialPortRequest,
    signal?: AbortSignal
  ): Promise<SerialPortResponse> {
    const isRealSerialPort = !this.instance.nonSerialPortDevice

    if (isRealSerialPort) {
      if (!this.serialPort) {
        throw new Error("SerialPortHandler is not initialized.")
      }

      if (!this.serialPort.isOpen) {
        throw new Error("Serial port is not open.")
      }
    }

    return new Promise((resolve, reject) => {
      const onAbort = () => {
        reject(new Error("Request aborted."))
      }

      signal?.addEventListener("abort", onAbort)

      this.serialPort
        ?.request(request)
        .then((response) => {
          signal?.removeEventListener("abort", onAbort)
          resolve(response as SerialPortResponse)
        })
        .catch((error) => {
          signal?.removeEventListener("abort", onAbort)
          reject(error)
        })
    })
  }

  /**
   * Public method to make a request to the serial port device.
   * This method adds the request to the queue and handles errors gracefully.
   * It returns a promise that resolves with the response or rejects with an error.
   * In case of errors, if the device is freezable, it will retry the request once the device is unfrozen.
   */
  async request(request: SerialPortRequest): Promise<SerialPortResponse> {
    const retriesLeft = request.options?.retries || 0
    const priority = request.options?.priority ?? 1

    if (
      this.status === SerialPortDeviceStatus.DeviceDisconnected &&
      !this.instance.nonSerialPortDevice
    ) {
      throw new Error(
        `Cannot make request to device at path ${this.info.path} because it is disconnected.`
      )
    }

    const pending = this.trackPendingRequest()

    try {
      const queued = Promise.resolve(
        this.requestsQueue.add(
          ({ signal }) => this.makeRequest(request, signal),
          {
            timeout:
              request.options?.timeout || this.instance.defaultRequestTimeout,
            priority,
            signal: this.requestsQueueAbortController.signal,
          }
        )
      )
      // The losing side of the race can still settle later; keep it handled.
      void queued.catch(() => undefined)

      const response = await Promise.race([queued, pending.cancelled])
      pending.release()

      return response as SerialPortResponse
    } catch (error) {
      pending.release()

      // A disconnected device cannot serve a retry: freezing, re-attaching or
      // re-queueing below would all operate on a device that is already gone.
      if (
        this.status === SerialPortDeviceStatus.DeviceDisconnected &&
        !this.instance.nonSerialPortDevice
      ) {
        throw error
      }

      const { body, data, ...rest } = request
      const requestInfo = JSON.stringify(rest)

      const isFrozen = this.freezeHandler.isFrozen
      const isFreezable = this.freezeHandler.isFreezable

      const isSerialPortTimeout =
        error instanceof SerialPortError &&
        error.type === SerialPortErrorType.ResponseTimeout
      const isQueueTimeout = error instanceof TimeoutError
      const isTimeout = isSerialPortTimeout || isQueueTimeout

      if (isFrozen) {
        AppLogger.log(
          "debug",
          `Device at path ${this.info.path} is currently frozen. Request ${requestInfo} will be retried once the device is unfrozen.`,
          { color: "yellow" }
        )

        return await this.request({
          ...request,
          options: { ...request.options, priority: priority + 1 },
        })
      } else if (isFreezable) {
        AppLogger.log(
          "debug",
          `Device at path ${this.info.path} is not frozen but is freezable. Request ${requestInfo} will be retried with a freeze attempt. Freezing`,
          { color: "yellow" }
        )
        this.freezeHandler.freeze()

        return await this.request({
          ...request,
          options: { ...request.options, priority: priority + 1 },
        })
      } else if (isTimeout && retriesLeft > 0) {
        AppLogger.log(
          "warn",
          `Request ${requestInfo} timed out for device at path ${this.info.path}. Retries left: ${retriesLeft}. Retrying request...`,
          { color: "yellow" }
        )

        return await this.request({
          ...request,
          options: {
            ...request.options,
            priority: priority + 1,
            retries: retriesLeft - 1,
          },
        })
      } else if (isTimeout && retriesLeft === 0) {
        AppLogger.log(
          "warn",
          `Request ${requestInfo} timed out for device at path ${this.info.path}. No more retries left. Reattaching device and retrying request one more time.`,
          { color: "red" }
        )
        this.attachPort()
        // Slight delay to allow the port to initialize properly before retrying the request
        await delay(1000)

        return await this.request({
          ...request,
          options: { ...request.options, priority: priority + 1, retries: -1 },
        })
      } else {
        AppLogger.log(
          "error",
          `Error making request ${requestInfo} for device at path ${this.info.path}: ${
            error instanceof SerialPortError
              ? error.type
              : error instanceof Error
                ? error.message
                : error
          }`
        )
        throw error
      }
    }
  }

  /**
   * Prepares the device to be frozen for a specified duration. During the freeze, requests will be blocked.
   * This is useful for scenarios like firmware updates where the device is expected to disconnect temporarily.
   */
  prepareToFreeze(duration?: number) {
    AppLogger.log(
      "silly",
      `Preparing device at path ${this.info.path} to freeze for duration: ${duration}ms.`,
      { color: "yellow" }
    )
    this.freezeHandler.prepareToFreeze(duration)
  }

  /**
   * Unfreezes the device, allowing requests to be processed again.
   * This can be called manually or will be triggered automatically after the freeze duration expires.
   */
  unfreeze() {
    AppLogger.log("debug", `Unfreezing device at path ${this.info.path}.`, {
      color: "blue",
    })
    this.freezeHandler.unfreeze()
  }

  /**
   * Returns whether the device is currently frozen.
   */
  isFrozen() {
    return this.freezeHandler.isFrozen
  }
}
