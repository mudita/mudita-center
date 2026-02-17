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
}

/**
 * SerialPortDevice represents a single serial port device and manages its state, requests, and lifecycle.
 * It handles opening the serial port, managing a queue of requests, and emitting events for connection and disconnection.
 */
export class SerialPortDevice {
  status = SerialPortDeviceStatus.DeviceInitializing

  private requestsQueue: PQueue
  private requestsQueueAbortController = new AbortController()
  private freezeHandler = new DeviceFreezeHandler()
  private serialPort?: SerialPortHandler | SerialPortHandlerMock
  private hasConnectedOnce = false
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
      this.status = SerialPortDeviceStatus.DeviceFrozen
      this.requestsQueue.pause()
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
      }
    })
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

    this.status = SerialPortDeviceStatus.DeviceDisconnected
    this.requestsQueue.clear()

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

    this.status = SerialPortDeviceStatus.DeviceConnected

    try {
      this.serialPort?.flush()
    } catch {
      //
    }

    this.requestsQueue.start()

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
  attachPort(info: SerialPortDeviceInfo = this.info, maxAttempts = 1) {
    AppLogger.log("silly", `Attaching serial port device at path ${info.path}.`)
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

    this.serialPort.cleanup()

    if (this.serialPort.isOpen || this.serialPort.opening) {
      try {
        this.serialPort.close()
      } catch {
        //
      }
    }

    this.serialPort = undefined
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

    this.serialPort.open()
  }

  /**
   * Handles errors that occur while opening the serial port by logging the error and retrying to open the port if there are attempts left.
   * If there are no attempts left, it will handle the disconnection of the device.
   */
  private handleError(error: Error, attemptsLeft: number) {
    AppLogger.log(
      "error",
      `Error opening serial port at path ${this.info.path}: ${
        error instanceof SerialPortError ? error.type : error.message
      }`
    )
    if (attemptsLeft <= 0) {
      this.handleDisconnect()
      return
    }

    setTimeout(() => {
      if (!this.serialPort?.isOpen && !this.serialPort?.opening) {
        this.serialPort?.open()
      }
    }, 1000)
  }

  /**
   * Activates the device, allowing it to be visible in the UI and fully ready for use.
   * The device must be in the DeviceConnected state to be activated.
   */
  activate() {
    if (this.status === SerialPortDeviceStatus.DeviceConnected) {
      this.status = SerialPortDeviceStatus.DeviceActive
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
      this.requestsQueue.clear()
      this.freezeHandler.off()
      this.status = SerialPortDeviceStatus.DeviceDisconnected
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
    if (!this.serialPort) {
      throw new Error("SerialPortHandler is not initialized.")
    }

    if (!this.serialPort.isOpen) {
      throw new Error("Serial port is not open.")
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

    if (this.status === SerialPortDeviceStatus.DeviceDisconnected) {
      throw new Error(
        `Cannot make request to device at path ${this.info.path} because it is disconnected.`
      )
    }

    try {
      return await this.requestsQueue.add(
        ({ signal }) => this.makeRequest(request, signal),
        {
          timeout:
            request.options?.timeout || this.instance.defaultRequestTimeout,
          priority,
          signal: this.requestsQueueAbortController.signal,
        }
      )
    } catch (error) {
      const { body, data, ...rest } = request
      const requestInfo = JSON.stringify(rest)

      const isFrozen = this.freezeHandler.isFrozen
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

  /**
   * Returns whether the device uses real serial port or only simulates it.
   */
  isNonSerialPort() {
    return this.instance.nonSerialPortDevice
  }
}
