/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPort, SerialPortOpenOptions } from "serialport"
import { AutoDetectTypes } from "@serialport/bindings-cpp"
import { Transform } from "stream"
import { cloneDeep, get, set, uniqueId } from "lodash"
import logger from "electron-log"
import { SerialPortError } from "app-serialport/utils"
import {
  SerialPortDeviceSubtype,
  SerialPortDeviceType,
  SerialPortErrorType,
  SerialPortRequest,
} from "app-serialport/models"
import EventEmitter from "events"

const LOG_CHARS_LIMIT = Number(process.env.SERIALPORT_LOG_LIMIT || 0)
const DEFAULT_REQUEST_TIMEOUT = 30_000

export type SerialPortHandlerOptions =
  SerialPortOpenOptions<AutoDetectTypes> & {
    parser?: Transform
    onOpen?: VoidFunction
    onClose?: VoidFunction
    onError?: (error: Error) => void
  }

enum SerialPortHandlerEvent {
  Response = "response",
  Error = "error",
  Open = "open",
  Close = "close",
}

interface Response {
  id: number
  body: Record<string, unknown>
}

export class SerialPortHandler extends SerialPort {
  private eventEmitter = new EventEmitter()

  static readonly deviceType: SerialPortDeviceType
  static readonly matchingVendorIds: string[] = []
  static readonly matchingProductIds: string[] = []
  static readonly nonSerialPortDevice: boolean = false
  readonly requestIdKey: string = "id"

  constructor(options: SerialPortHandlerOptions) {
    const { onOpen, onClose, onError, ...serialPortOptions } = options
    super({ ...serialPortOptions, autoOpen: false })

    this.on("open", () => {
      this.flush()
      onOpen?.()
    })
    if (onClose) {
      this.on("close", onClose)
    }
    if (onError) {
      this.on("error", onError)
    }

    if (options.parser) {
      this.pipe(options.parser)
        .on("data", (data) => {
          this.processResponse(data)
        })
        .on("error", (error) => {
          onError?.(error)
        })
    }
  }

  async writeAsync(data: unknown): Promise<void> {
    try {
      const parsedData = this.parseRequest(data)

      if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
        logger.info(
          `%cSending request: '${sliceLogs(parsedData?.toString())}'`,
          "color: blue"
        )
      }

      const canContinue = super.write(parsedData)

      if (!canContinue) {
        // Buffer is full, wait for 'drain' event before resolving
        await new Promise<void>((resolve, reject) => {
          const onDrain = () => {
            this.off("error", onError)
            this.off("close", onClose)
            resolve()
          }

          const onError = (error: Error) => {
            this.off("drain", onDrain)
            this.off("close", onClose)
            reject(error)
          }

          const onClose = () => {
            this.off("drain", onDrain)
            this.off("error", onError)
            reject(new SerialPortError(SerialPortErrorType.PortClosed))
          }

          this.once("drain", onDrain)
          this.once("error", onError)
          this.once("close", onClose)
        })
      }
    } catch (error) {
      logger.error(
        `Error parsing response for device at path ${this.path}.`,
        error instanceof Error ? error.message : error
      )
      throw new SerialPortError(SerialPortErrorType.InvalidRequest)
    }
  }

  parseRequest(data: unknown) {
    return data
  }

  async request(data: SerialPortRequest): Promise<Response["body"]> {
    const id = parseInt(uniqueId()) % 99999999 || 1

    const dataWithId = set(cloneDeep(data), this.requestIdKey, id)
    await this.writeAsync(dataWithId)

    return new Promise((resolve, reject) => {
      const cleanupListeners = () => {
        this.eventEmitter.off(SerialPortHandlerEvent.Response, onResponse)
        this.eventEmitter.off(SerialPortHandlerEvent.Error, onError)
        this.off("close", onClose)
        clearTimeout(timeoutId)
      }

      const onResponse = (response: Response) => {
        if (response.id === id) {
          cleanupListeners()
          resolve(response.body)
        }
      }

      const onError = (error: SerialPortError) => {
        if (error.requestId === id) {
          cleanupListeners()
          reject(error)
        }
      }

      const onClose = () => {
        cleanupListeners()
        reject(new SerialPortError(SerialPortErrorType.PortClosed, id))
      }

      const onTimeout = () => {
        cleanupListeners()
        reject(new SerialPortError(SerialPortErrorType.ResponseTimeout, id))
      }

      const timeoutId = setTimeout(
        onTimeout,
        data.options?.timeout || DEFAULT_REQUEST_TIMEOUT
      )

      this.eventEmitter.on(SerialPortHandlerEvent.Response, onResponse)
      this.eventEmitter.on(SerialPortHandlerEvent.Error, onError)
      this.once("close", onClose)
    })
  }

  private parseResponse(data: Buffer) {
    try {
      const rawResponse = data.toString()
      if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
        logger.info(
          `%cReceived response: '${sliceLogs(rawResponse)}'`,
          "color: green"
        )
      }
      const response = JSON.parse(rawResponse)
      const id = get(response, this.requestIdKey) as string | number | undefined

      if (id === undefined) {
        throw new SerialPortError(SerialPortErrorType.ResponseWithoutId)
      }

      return {
        id: typeof id === "number" ? id : parseInt(id, 10),
        body: response,
      } as Response
    } catch (error) {
      logger.error(`Error parsing response for device at path ${this.path}.`)

      if (error instanceof SerialPortError) {
        logger.error(
          `Type: ${error.type}`,
          `Request ID: ${error.requestId}`,
          `Message: ${error.message}`
        )
        throw error
      } else {
        logger.error(
          `Unknown error: ${error instanceof Error ? error.message : error}`
        )
        throw new SerialPortError(SerialPortErrorType.InvalidResponse)
      }
    }
  }

  private processResponse(data: Buffer) {
    try {
      const response = this.parseResponse(data)
      this.emitResponse(response)
    } catch (error) {
      this.emitError(error)
    }
  }

  private emitResponse(response: Response) {
    this.eventEmitter.emit(SerialPortHandlerEvent.Response, response)
  }

  private emitError(error: unknown) {
    if (error instanceof SerialPortError) {
      this.eventEmitter.emit(SerialPortHandlerEvent.Error, error)
    } else {
      this.eventEmitter.emit(
        SerialPortHandlerEvent.Error,
        new SerialPortError(SerialPortErrorType.InvalidResponse)
      )
    }
  }

  public static getSubtype(
    _vendorId?: string,
    _productId?: string
  ): SerialPortDeviceSubtype | undefined {
    return undefined
  }

  public static getProductsGroups() {
    return [
      {
        vendorIds: this.matchingVendorIds,
        productIds: this.matchingProductIds,
      },
    ]
  }

  changeBaudRate(baudRate: number) {
    this.update({ baudRate })
  }
}

const sliceLogs = (text = "") => {
  if (LOG_CHARS_LIMIT > 0) {
    return [
      text.slice(0, LOG_CHARS_LIMIT),
      text.length > LOG_CHARS_LIMIT ? "..." : "",
    ].join("")
  }
  return text
}
