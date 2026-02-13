/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortMock } from "serialport"
import { cloneDeep, get, set, uniqueId } from "lodash"
import { SerialPortError } from "app-serialport/utils"
import {
  SerialPortDeviceSubtype,
  SerialPortDeviceType,
  SerialPortErrorType,
  SerialPortRequest,
} from "app-serialport/models"
import EventEmitter from "events"
import { SerialPortHandlerOptions } from "./serial-port-handler"

const DEFAULT_REQUEST_TIMEOUT = 30_000

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

export class SerialPortHandlerMock extends SerialPortMock {
  private readonly eventEmitter = new EventEmitter()

  static readonly deviceType: SerialPortDeviceType
  static readonly matchingVendorIds: string[] = []
  static readonly matchingProductIds: string[] = []
  static readonly nonSerialPortDevice = true
  static readonly defaultRequestTimeout = 30_000
  readonly requestIdKey: string = "id"

  constructor(options: Omit<SerialPortHandlerOptions, "baudRate">) {
    SerialPortMock.binding.createPort(options.path)
    const { onOpen, onClose, onError, parser, autoOpen, ...serialPortOptions } =
      options
    super({ ...serialPortOptions, baudRate: 9600, autoOpen: autoOpen ?? true })

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

    if (parser) {
      this.pipe(parser)
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
      super.write(parsedData)
    } catch {
      throw new SerialPortError(SerialPortErrorType.InvalidRequest)
    }
  }

  emitData(id: number, data: object) {
    super.emit("data", JSON.stringify({ id, ...data }))
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
      if (error instanceof SerialPortError) {
        throw error
      } else {
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
