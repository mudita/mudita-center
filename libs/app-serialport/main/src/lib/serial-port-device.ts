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
const REATTACH_SETTLE_DELAY_MS = 1_000

/**
 * How long to wait for a port to finish closing before opening the path
 * again. A port that never reports closed must not block the next open for
 * good - the open retries are there for exactly that case.
 */
const PORT_CLOSE_TIMEOUT_MS = 2_000

/**
 * Budget for a single `request()` call. Every rung of the retry ladder spends
 * from it, so one call can never produce an unbounded chain of retries.
 */
const MAX_REQUEST_ATTEMPTS = 6

/**
 * A frozen device keeps its queue paused, so a queued request normally waits
 * there instead of failing. This budget bounds the other case: a request that
 * *fails* while the device is frozen, which would otherwise be re-queued for
 * as long as the freeze lasts.
 */
const MAX_FREEZE_WAITS = 2
const MAX_FREEZE_ATTEMPTS = 1
const MAX_REATTACH_ATTEMPTS = 1

/**
 * Errors raised by `makeRequest` before the request reaches the wire.
 */
const PORT_UNAVAILABLE_MESSAGES = [
  "SerialPortHandler is not initialized.",
  "Serial port is not open.",
]

const isTimeoutFailure = (error: unknown) =>
  (error instanceof SerialPortError &&
    error.type === SerialPortErrorType.ResponseTimeout) ||
  error instanceof TimeoutError

/**
 * A failure of the transport itself, as opposed to a device or protocol error.
 * Only these justify freezing a freezable device: a malformed payload or a
 * rejected command says nothing about the port being usable.
 */
const isTransportFailure = (error: unknown) =>
  isTimeoutFailure(error) ||
  (error instanceof SerialPortError &&
    error.type === SerialPortErrorType.PortClosed) ||
  (error instanceof Error && PORT_UNAVAILABLE_MESSAGES.includes(error.message))

const describeError = (error: unknown) =>
  error instanceof SerialPortError
    ? error.type
    : error instanceof Error
      ? error.message
      : String(error)

const isAbortError = (error: unknown) =>
  typeof error === "object" &&
  error !== null &&
  "name" in error &&
  (error as { name?: unknown }).name === "AbortError"

/**
 * Builds a typed error that still reads like the one it replaces.
 *
 * `SerialPortError` keeps its type in the message, and `parse` reads only what
 * follows the marker - so the original reason can ride in front of it and stay
 * visible in logs and stack traces.
 */
const typedError = (type: SerialPortErrorType, cause: unknown) => {
  const error = new SerialPortError(type)
  error.message = `${describeError(cause)} ${error.message}`
  return error
}

/**
 * Only a `SerialPortError` carries its type across the IPC boundary; anything
 * else reaches the renderer as a bare message and is read as `Unknown`, which
 * the UI treats as a critical device fault. A timed-out queue entry, a request
 * cancelled during teardown and a port that was never opened are none of those,
 * so they get named here instead of being flattened into "something broke".
 */
const toSerialPortError = (error: unknown) => {
  if (error instanceof SerialPortError) {
    return error
  }
  if (error instanceof TimeoutError) {
    return typedError(SerialPortErrorType.ResponseTimeout, error)
  }
  if (isAbortError(error)) {
    return typedError(SerialPortErrorType.RequestAborted, error)
  }
  if (
    error instanceof Error &&
    PORT_UNAVAILABLE_MESSAGES.includes(error.message)
  ) {
    return typedError(SerialPortErrorType.PortClosed, error)
  }
  return error
}

type RequestEscalation = "wait-for-unfreeze" | "freeze" | "retry" | "reattach"

interface RequestBudget {
  timeoutRetries: number
  freezeWaits: number
  freezes: number
  reattaches: number
}

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
  private pendingDetach?: Promise<void>
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

    // Nothing held and nothing closing, so the port can go up right away.
    if (!this.serialPort && !this.pendingDetach) {
      this.createSerialPort(info.path, maxAttempts)
      return
    }

    // Opening the path while a handle still holds it is what Windows answers
    // with "access denied" or "unknown error code 433" - the errors
    // `isWindowsTransientOpenError` then retries around. Waiting for the
    // close removes the cause instead of papering over it.
    //
    // The wait keys off the close rather than off `serialPort`, because
    // `detachPort` clears that field the moment it starts: an attach
    // arriving in that window would see no port at all and reopen the path
    // from under the handle still closing on it.
    const instanceId = this.portInstanceId

    void this.detachPort().then(() => {
      if (instanceId !== this.portInstanceId) {
        return
      }
      this.createSerialPort(info.path, maxAttempts)
    })
  }

  /**
   * Detaches the current serial port from the device by removing event listeners and closing the port if it's open.
   * This method is called when the device is being reinitialized with a new serial port or when the device is destroyed.
   * After detaching, the device will no longer have an associated serial port until attachPort is called again.
   */
  private detachPort(): Promise<void> {
    const port = this.serialPort
    this.serialPort = undefined

    // A close already in flight has to finish first: two handles open on one
    // path is the state Windows refuses to open into. There is never both a
    // port to close and a close to wait for - `serialPort` is cleared here
    // the moment a close starts, and is only set again from a continuation
    // that runs after `pendingDetach` has been cleared.
    if (!port) {
      return this.pendingDetach ?? Promise.resolve()
    }

    const detached = this.closePort(port)

    this.pendingDetach = detached
    void detached.then(() => {
      if (this.pendingDetach === detached) {
        this.pendingDetach = undefined
      }
    })

    return detached
  }

  /**
   * Closes a single handle and releases it, waiting no longer than
   * PORT_CLOSE_TIMEOUT_MS for the close to report back.
   */
  private closePort(
    port: SerialPortHandler | SerialPortHandlerMock
  ): Promise<void> {
    const closed = new Promise<void>((resolve) => {
      if (!port.isOpen) {
        resolve()
        return
      }
      try {
        port.close(() => resolve())
      } catch {
        resolve()
      }
    })

    let closeTimeout: NodeJS.Timeout | undefined
    const guard = new Promise<void>((resolve) => {
      closeTimeout = setTimeout(resolve, PORT_CLOSE_TIMEOUT_MS)
    })

    return Promise.race([closed, guard]).then(() => {
      clearTimeout(closeTimeout)
      port.cleanup()
    })
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

    // Nothing in flight before this point may come back. Advancing the
    // generation drops every pending attach continuation, and turns the
    // handlers of a port that is still closing into no-ops - `handleClose`
    // on a destroyed device would otherwise reach the freeze handler that
    // `destroy` has just switched off.
    this.portInstanceId++

    // `detachPort` already answers "is there a port?" - asking it twice only
    // leaves one of the two answers untested.
    void this.detachPort()
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
    // A device with no handler at all cannot serve the request. Falling
    // through used to leave the promise unsettled forever, which is the one
    // outcome the caller cannot recover from.
    if (!this.serialPort) {
      throw new Error("SerialPortHandler is not initialized.")
    }

    if (!this.instance.nonSerialPortDevice && !this.serialPort.isOpen) {
      throw new Error("Serial port is not open.")
    }

    // The handler owns the request from here, the signal included: cancelling
    // has to release the port, not just stop us from awaiting it.
    return (await this.serialPort.request(
      request,
      signal
    )) as SerialPortResponse
  }

  /**
   * Runs one attempt through the queue and settles it, whichever comes first:
   * the queued task, or an explicit cancellation when the device goes away.
   *
   * Request timing belongs to the handler, which is the only layer that can
   * act on it: its timer arms before the write and its rejection releases the
   * port. A second timeout here would only stop us waiting - the queue would
   * free the slot and send the next request while this one still held the
   * wire, and `concurrency: 1` would stop meaning anything.
   */
  private async runQueuedRequest(
    request: SerialPortRequest,
    priority: number
  ): Promise<SerialPortResponse> {
    const pending = this.trackPendingRequest()

    try {
      const queued = Promise.resolve(
        this.requestsQueue.add(
          ({ signal }) => this.makeRequest(request, signal),
          {
            priority,
            signal: this.requestsQueueAbortController.signal,
          }
        )
      )
      // The losing side of the race can still settle later; keep it handled.
      void queued.catch(() => undefined)

      return (await Promise.race([
        queued,
        pending.cancelled,
      ])) as SerialPortResponse
    } finally {
      pending.release()
    }
  }

  /**
   * A disconnected serial device cannot serve a retry. A non-serial device
   * (MSC, mock) is not backed by a port, so `request()` keeps serving it.
   */
  private isUnreachable() {
    return (
      this.status === SerialPortDeviceStatus.DeviceDisconnected &&
      !this.instance.nonSerialPortDevice
    )
  }

  /**
   * Decides the next rung of the retry ladder, spending from `budget`.
   * Returning `undefined` ends the ladder and lets the error through.
   */
  private planEscalation(
    error: unknown,
    budget: RequestBudget,
    attempt: number
  ): RequestEscalation | undefined {
    if (attempt >= MAX_REQUEST_ATTEMPTS) {
      return undefined
    }

    // A frozen device is expected to fail; the next attempt waits on the
    // paused queue until the device is unfrozen or destroyed.
    if (this.freezeHandler.isFrozen) {
      if (budget.freezeWaits <= 0) {
        return undefined
      }
      budget.freezeWaits -= 1
      return "wait-for-unfreeze"
    }

    if (this.freezeHandler.isFreezable && isTransportFailure(error)) {
      if (budget.freezes <= 0) {
        return undefined
      }
      budget.freezes -= 1
      return "freeze"
    }

    if (!isTimeoutFailure(error)) {
      return undefined
    }

    if (budget.timeoutRetries > 0) {
      budget.timeoutRetries -= 1
      return "retry"
    }

    if (budget.reattaches > 0) {
      budget.reattaches -= 1
      return "reattach"
    }

    return undefined
  }

  private async applyEscalation(escalation: RequestEscalation) {
    if (escalation === "freeze") {
      this.freezeHandler.freeze()
      return
    }

    if (escalation === "reattach") {
      this.attachPort()
      // Slight delay to allow the port to initialize properly before retrying.
      await delay(REATTACH_SETTLE_DELAY_MS)
    }
  }

  /**
   * Public method to make a request to the serial port device.
   *
   * The request is queued; on failure it escalates through a single bounded
   * ladder - wait out a freeze, freeze a freezable device, retry a timeout,
   * re-attach the port once - and each rung spends from a per-call budget.
   * Escalation is iterative rather than recursive, so a device that keeps
   * failing produces a fixed number of attempts instead of a retry storm.
   */
  async request(request: SerialPortRequest): Promise<SerialPortResponse> {
    if (this.isUnreachable()) {
      throw typedError(
        SerialPortErrorType.PortClosed,
        new Error(
          `Cannot make request to device at path ${this.info.path} because it is disconnected.`
        )
      )
    }

    const { body, data, ...rest } = request
    // Only the retry and failure messages below ever ask for this, and both
    // are exceptional. Serializing it up front spends the work on every
    // request to answer a question almost none of them raise.
    const requestInfo = () => JSON.stringify(rest)

    const budget: RequestBudget = {
      timeoutRetries: request.options?.retries ?? 0,
      freezeWaits: MAX_FREEZE_WAITS,
      freezes: MAX_FREEZE_ATTEMPTS,
      reattaches: MAX_REATTACH_ATTEMPTS,
    }

    const basePriority = request.options?.priority ?? 1
    // A retry keeps its place ahead of work queued while it was failing, but it
    // does not climb: raising the priority on every rung would let one failing
    // request displace fresh ones again and again.
    const retryPriority = basePriority + 1

    let lastError: unknown

    for (let attempt = 1; ; attempt++) {
      // The device can go away between attempts - while a re-attach settles,
      // for instance. By then `transition(DeviceDisconnected)` has drained the
      // rejector set, so a request queued now would sit on a paused queue with
      // nothing left to settle it.
      if (attempt > 1 && this.isUnreachable()) {
        throw toSerialPortError(
          lastError instanceof Error
            ? lastError
            : new Error(
                `Device at path ${this.info.path} disconnected while retrying request ${requestInfo()}.`
              )
        )
      }

      try {
        return await this.runQueuedRequest(
          request,
          attempt === 1 ? basePriority : retryPriority
        )
      } catch (error) {
        lastError = error

        if (this.isUnreachable()) {
          throw toSerialPortError(error)
        }

        const escalation = this.planEscalation(error, budget, attempt)

        if (escalation === undefined) {
          AppLogger.log(
            "error",
            `Error making request ${requestInfo()} for device at path ${this.info.path} after ${attempt} attempt(s): ${describeError(error)}`
          )
          throw toSerialPortError(error)
        }

        AppLogger.log(
          "warn",
          `Request ${requestInfo()} for device at path ${this.info.path} failed on attempt ${attempt} (${describeError(error)}). Next: ${escalation}.`,
          { color: "yellow" }
        )

        await this.applyEscalation(escalation)
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
