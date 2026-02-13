/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPort, SerialPortOpenOptions } from "serialport"
import { AutoDetectTypes } from "@serialport/bindings-cpp"
import { Transform } from "stream"
import { cloneDeep, get, set, uniqueId } from "lodash"
import { AppLogger, SerialPortError } from "app-serialport/utils"
import {
  SerialPortDeviceSubtype,
  SerialPortDeviceType,
  SerialPortErrorType,
  SerialPortRequest,
} from "app-serialport/models"
import EventEmitter from "events"

export type SerialPortHandlerOptions =
  SerialPortOpenOptions<AutoDetectTypes> & {
    parser?: Transform
    onOpen?: VoidFunction
    onClose?: VoidFunction
    onError?: (error: Error) => void
    autoOpen?: boolean
  }

export enum SerialPortHandlerEvent {
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
  private readonly eventEmitter = new EventEmitter()

  static readonly deviceType: SerialPortDeviceType
  static readonly matchingVendorIds: string[] = []
  static readonly matchingProductIds: string[] = []
  static readonly nonSerialPortDevice: boolean = false
  static readonly defaultRequestTimeout = 30_000
  readonly requestIdKey: string = "id"

  constructor(options: SerialPortHandlerOptions) {
    const { onOpen, onClose, onError, parser, autoOpen, ...serialPortOptions } =
      options
    super({ ...serialPortOptions, autoOpen: autoOpen ?? false })

    if (onOpen) {
      this.on("open", onOpen)
    }
    if (onClose) {
      this.on("close", onClose)
    }
    if (onError) {
      this.on("error", onError)
    }

    if (parser) {
      this.on("data", (rawData) => {
        console.log(
          `[DEBUG] RAW data received BEFORE parser at ${Date.now()}, length: ${rawData?.length || 0}, content: ${rawData?.toString()}`
        )
      })
      this.pipe(parser)
        .on("data", (data) => {
          this.processResponse(data)
        })
        .on("error", (error) => {
          onError?.(error)
        })
    }
  }

  async writeAsync(data: unknown, retries = 1): Promise<void> {
    try {
      const parsedData = this.parseRequest(data)
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
      if (retries > 0 && this.isOpen) {
        AppLogger.log(
          "debug",
          `Error writing request for device at path ${this.path}. Retrying... (retries left: ${
            retries - 1
          })`,
          { color: "yellow" }
        )
        this.flush()
        return this.writeAsync(data, retries - 1)
      } else {
        AppLogger.log(
          "error",
          `Error parsing request for device at path ${this.path}. ${
            error instanceof Error ? error.message : String(error)
          }`
        )
        throw new SerialPortError(SerialPortErrorType.InvalidRequest)
      }
    }
  }

  parseRequest(data: unknown) {
    return data
  }

  async request(data: SerialPortRequest): Promise<Response["body"]> {
    const id = parseInt(uniqueId()) % 99999999 || 1

    const dataWithId = set(cloneDeep(data), this.requestIdKey, id)

    return await new Promise<Response["body"]>((resolve, reject) => {
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
        AppLogger.log(
          "warn",
          `Request timeout for device at path ${this.path}, request id: ${id}. No response received within ${data.options?.timeout || SerialPortHandler.defaultRequestTimeout}ms.`,
          { color: "yellow" }
        )
        cleanupListeners()
        reject(new SerialPortError(SerialPortErrorType.ResponseTimeout, id))
      }

      const timeoutId = setTimeout(
        onTimeout,
        data.options?.timeout || SerialPortHandler.defaultRequestTimeout
      )

      this.eventEmitter.on(SerialPortHandlerEvent.Response, onResponse)
      this.eventEmitter.on(SerialPortHandlerEvent.Error, onError)
      this.once("close", onClose)

      if (process.env.NODE_ENV === "development") {
        AppLogger.log(
          "debug",
          `Request sent for device at path ${this.path}:`,
          {
            color: "magenta",
          }
        )
        AppLogger.log("debug", JSON.stringify(dataWithId), {
          color: "gray",
          addNewLine: true,
        })
      } else {
        const { body, data: _, ...rest } = dataWithId
        AppLogger.log(
          "debug",
          `Request sent for device at path ${this.path}:`,
          {
            color: "magenta",
          }
        )
        AppLogger.log("debug", JSON.stringify(rest), {
          color: "gray",
          addNewLine: true,
        })
      }

      this.writeAsync(dataWithId).catch((error) => {
        cleanupListeners()
        reject(error)
      })
    })
  }

  private parseResponse(data: Buffer): Response {
    try {
      const rawResponse = data.toString()
      if (process.env.NODE_ENV === "development") {
        AppLogger.log(
          "debug",
          `Received response for device at path ${this.path}:`,
          { color: "green" }
        )
        AppLogger.log("debug", rawResponse, { color: "gray", addNewLine: true })
      }
      const response = JSON.parse(rawResponse)
      const id = get(response, this.requestIdKey) as string | number | undefined

      if (id === undefined) {
        throw new SerialPortError(SerialPortErrorType.ResponseWithoutId)
      }

      const { body, data: _, ...rest } = response
      if (process.env.NODE_ENV !== "development") {
        AppLogger.log(
          "debug",
          `Received response for device at path ${this.path}:`,
          { color: "green" }
        )
        AppLogger.log("debug", JSON.stringify(rest), {
          color: "gray",
          addNewLine: true,
        })
      }

      return {
        id: typeof id === "number" ? id : parseInt(id, 10),
        body: response,
      } as Response
    } catch (error) {
      AppLogger.log(
        "error",
        `Error parsing response for device at path ${this.path}. ${
          error instanceof Error ? error.message : String(error)
        }`
      )

      if (error instanceof SerialPortError) {
        AppLogger.log(
          "error",
          `SerialPortError details: Type: ${error.type}, Request ID: ${error.requestId}, Message: ${error.message}`
        )
        throw error
      } else {
        AppLogger.log(
          "error",
          `Unknown error: ${error instanceof Error ? error.message : String(error)}`
        )
        throw new SerialPortError(SerialPortErrorType.InvalidResponse)
      }
    }
  }

  private processResponse(data: Buffer) {
    try {
      const response = this.parseResponse(data)
      const listenerCount = this.eventEmitter.listenerCount(
        SerialPortHandlerEvent.Response
      )
      AppLogger.log(
        "debug",
        `Processing response id: ${response.id}, active listeners: ${listenerCount}`,
        { color: "cyan" }
      )
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
}
