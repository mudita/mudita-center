/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PQueue from "p-queue"
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SerialPortHandler } from "../../../devices/src/lib/serial-port-handler"
import {
  SerialPortDeviceInfo,
  SerialPortRequest,
  SerialPortResponse,
} from "app-serialport/models"
import EventEmitter from "events"
import logger from "electron-log"
import { AppSerialportDeviceScanner } from "./app-serialport-device-scanner"
import { DeviceFreezeHandler } from "./helpers/device-freeze-handler"

const DEFAULT_QUEUE_INTERVAL = 1
const DEFAULT_QUEUE_CONCURRENCY = 1
const DEFAULT_QUEUE_INTERVAL_CAPACITY = 1

export enum SerialPortDeviceStatus {
  /**
   * Default status when the device is created.
   * The device is being initialized and is not yet ready for requests.
   */
  DeviceInitializing = "DeviceInitializing",

  /**
   * SerialPort is open and ready to handle requests,
   * but the device is not active yet (not visible in the UI).
   */
  DeviceConnected = "DeviceConnected",

  /**
   * SerialPort is open and ready to handle requests, and the device is active (visible in the UI).
   * This status indicates that the device is fully ready for use.
   */
  DeviceActive = "DeviceReady",

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
  private serialPort?: SerialPortHandler
  private eventEmitter = new EventEmitter()
  private freezeHandler = new DeviceFreezeHandler()

  constructor(
    public info: SerialPortDeviceInfo,
    private options?: Options
  ) {
    this.requestsQueue = new PQueue({
      concurrency: options?.queueConcurrency ?? DEFAULT_QUEUE_CONCURRENCY,
      interval: options?.queueInterval ?? DEFAULT_QUEUE_INTERVAL,
      intervalCap:
        options?.queueIntervalCapacity ?? DEFAULT_QUEUE_INTERVAL_CAPACITY,
      autoStart: false,
      timeout: 30_000,
    })
  }

  /**
   * Initializes the SerialPortDevice by opening the serial port and setting up event listeners.
   */
  initialize(reinitialization = false, maxAttempts = 1): void {
    logger.silly(`Initializing serial port device at path ${this.info.path}.`)

    const instance = AppSerialportDeviceScanner.getMatchingInstance(this.info)
    if (!instance) {
      logger.error(
        `No matching instance found for device at path ${this.info.path}.`
      )
      return
    }

    const handleConnect = () => {
      logger.debug(`Serial port opened at path ${this.info.path}.`)
      this.status = SerialPortDeviceStatus.DeviceConnected
      this.serialPort?.flush()
      this.requestsQueue.start()

      if (!reinitialization) {
        this.options?.onConnect?.()
      }
    }

    const handleDisconnect = () => {
      logger.debug(`Serial port closed at path ${this.info.path}.`)
      this.status = SerialPortDeviceStatus.DeviceDisconnected
      this.requestsQueue.clear()
      this.options?.onDisconnect?.()
    }

    const handleReconnect = () => {
      reinitialization = true
      logger.debug(`Serial port reconnected at path ${this.info.path}.`)

      if (!this.serialPort?.isOpen) {
        this.serialPort?.open()
      }
    }

    this.serialPort = new instance({
      path: this.info.path,
      onOpen: () => {
        handleConnect()
      },
      onError: (error) => {
        logger.error(
          `Error opening serial port at path ${this.info.path}:`,
          error
        )
        if (maxAttempts <= 0) {
          this.initialize(true, maxAttempts - 1)
        } else {
          handleDisconnect()
        }
      },
      onClose: () => {
        logger.info(`Serial port closed at path ${this.info.path}.`)

        if (this.freezeHandler.isFreezable) {
          logger.silly(
            `Device at path ${this.info.path} is freezable. Freezing device instead of disconnecting.`
          )
          this.freezeHandler.freeze()
        } else {
          logger.silly(
            `Device at path ${this.info.path} is not freezable. Proceeding with disconnection.`
          )
          handleDisconnect()
        }
      },
    })

    this.freezeHandler.on("freeze", () => {
      logger.debug(`Device at path ${this.info.path} is frozen.`)
      this.status = SerialPortDeviceStatus.DeviceFrozen
      this.requestsQueue.pause()
    })

    this.freezeHandler.on("unfreeze", (reason) => {
      logger.debug(
        `Device at path ${this.info.path} is unfrozen. Reason: ${reason}.`
      )
      if (reason === "timeout") {
        handleDisconnect()
      } else {
        handleReconnect()
      }
    })

    this.serialPort.open()
  }

  /**
   * Activates the device, allowing it to be visible in the UI and fully ready for use.
   * The device must be in the DeviceConnected state to be activated.
   */
  activate() {
    if (this.status === SerialPortDeviceStatus.DeviceConnected) {
      this.status = SerialPortDeviceStatus.DeviceActive
    } else {
      logger.warn(
        `Cannot activate device at path ${this.info.path} because it is not in the DeviceConnected state. Current status: ${this.status}`
      )
    }
  }

  /**
   * Destroys the device by closing the serial port and cleaning up resources.
   * The device will transition to the DeviceDisconnected state.
   */
  async destroy() {
    this.eventEmitter.removeAllListeners()
    this.requestsQueue.clear()

    if (this.serialPort?.isOpen) {
      this.serialPort.close()

      await new Promise<void>((resolve) => {
        const checkClosed = () => {
          if (!this.serialPort?.isOpen) {
            resolve()
          } else {
            setTimeout(checkClosed, 100)
          }
        }
        checkClosed()
      })
    }

    this.serialPort = undefined
  }

  /**
   * Internal method to make a request to the serial port.
   * This method is called by the requests queue and should not be called directly.
   * It ensures that the SerialPort is initialized before making the request.
   */
  private async makeRequest(
    request: SerialPortRequest
  ): Promise<SerialPortResponse> {
    if (!this.serialPort) {
      throw new Error("SerialPortHandler is not initialized.")
    }

    if (!this.serialPort.isOpen) {
      throw new Error("Serial port is not open.")
    }

    return (await this.serialPort.request(request)) as SerialPortResponse
  }

  /**
   * Public method to make a request to the serial port device.
   * This method adds the request to the queue and handles errors gracefully.
   * It returns a promise that resolves with the response or rejects with an error.
   */
  async request(request: SerialPortRequest) {
    try {
      logger.silly(
        `Adding request to queue for device at path ${this.info.path}:`,
        request
      )

      return await this.requestsQueue.add(() => this.makeRequest(request), {
        timeout: request.options?.timeout,
      })
    } catch (error) {
      if (this.freezeHandler.isFrozen) {
        logger.debug(
          `Device at path ${this.info.path} is currently frozen. Request will be retried once the device is unfrozen.`
        )
        return await this.requestsQueue.add(() => this.makeRequest(request), {
          timeout: request.options?.timeout,
        })
      } else {
        logger.error(
          `Error making request for device at path ${this.info.path}:`,
          error instanceof Error ? error.message : error
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
    logger.silly(
      `Preparing device at path ${this.info.path} to freeze for duration: ${duration}ms.`
    )
    this.freezeHandler.prepareToFreeze(duration)
  }

  /**
   * Unfreezes the device, allowing requests to be processed again.
   * This can be called manually or will be triggered automatically after the freeze duration expires.
   */
  unfreeze() {
    this.freezeHandler.unfreeze()
  }

  /**
   * Returns whether the device is currently frozen.
   */
  isFrozen() {
    return this.freezeHandler.isFrozen
  }

  /**
   * Changes the baud rate of the serial port.
   * This method can be called while the device is active to change the baud rate on the fly.
   */
  changeBaudRate(baudRate: number) {
    if (!this.serialPort) {
      logger.error(
        `Cannot change baud rate for device at path ${this.info.path} because SerialPort is not initialized.`
      )
      return
    }
    this.serialPort.changeBaudRate(baudRate)
  }
}
