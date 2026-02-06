/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPort, SerialPortOpenOptions } from "serialport"
import { AutoDetectTypes } from "@serialport/bindings-cpp"
import { Transform } from "stream"
import {
  SerialPortDeviceSubtype,
  SerialPortDeviceType,
  SerialPortErrorType,
  SerialPortRequest,
  SerialPortResponse,
} from "app-serialport/models"
import { clone, get, set, uniqueId } from "lodash"
import EventEmitter from "events"
import PQueue from "p-queue"
import { SerialPortError } from "app-serialport/utils"
import { styleText } from "util"

const DEFAULT_QUEUE_INTERVAL = 1
const DEFAULT_QUEUE_CONCURRENCY = 1
const DEFAULT_QUEUE_INTERVAL_CAPACITY = 1
const DEFAULT_RESPONSE_TIMEOUT = 30000
const LOG_CHARS_LIMIT = Number(process.env.SERIALPORT_LOG_LIMIT || 0)

type BaseSerialPortDeviceOptions = SerialPortOpenOptions<AutoDetectTypes> & {
  queueInterval?: number
  queueConcurrency?: number
}

export type SerialPortDeviceOptions = Omit<
  BaseSerialPortDeviceOptions,
  "baudRate"
> & {
  baudRate?: number
}

export class SerialPortDevice extends SerialPort {
  #responseEmitter = new EventEmitter()
  #queue: PQueue
  static readonly deviceType: SerialPortDeviceType
  static readonly matchingVendorIds: string[] = []
  static readonly matchingProductIds: string[] = []
  static readonly nonSerialPortDevice: boolean = false
  readonly requestIdKey: string = "id"

  constructor(
    {
      queueInterval = DEFAULT_QUEUE_INTERVAL,
      queueConcurrency = DEFAULT_QUEUE_CONCURRENCY,
      ...options
    }: BaseSerialPortDeviceOptions,
    parser?: Transform
  ) {
    super({ ...options, autoOpen: true })
    this.#responseEmitter.setMaxListeners(100)
    this.#queue = new PQueue({
      concurrency: queueConcurrency,
      interval: queueInterval,
      intervalCap: DEFAULT_QUEUE_INTERVAL_CAPACITY,
    })
    if (parser) {
      super.pipe(parser).on("data", (data) => this.parseResponse(data))
    }
  }

  private parseResponse(buffer: Buffer) {
    try {
      const rawResponse = buffer.toString()
      if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
        console.log(
          styleText(["bold", "bgMagenta"], "SerialPort response"),
          styleText(["bgMagenta"], this.path),
          styleText(["magenta"], `${sliceLogs(rawResponse)}`),
          "\n"
        )
      }
      const response = JSON.parse(rawResponse)
      const id = get(response, this.requestIdKey)
      if (!id) {
        throw SerialPortErrorType.ResponseWithoutId
      }
      this.#responseEmitter.emit(`response-${id}`, response)
    } catch (error) {
      if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
        console.log(
          styleText(["bold", "bgRed"], "SerialPort response parse error"),
          styleText(["bgRed"], this.path),
          styleText(
            ["red"],
            error instanceof SerialPortError
              ? error.type
              : error instanceof Error
                ? error.message
                : String(error)
          ),
          "\n"
        )
      }
      super.emit(
        "error",
        new SerialPortError(SerialPortErrorType.InvalidResponse)
      )
    }
  }

  private listenForResponse(id: number | string, timeoutMs: number) {
    let timeout: NodeJS.Timeout

    return new Promise<SerialPortResponse>((resolve, reject) => {
      const listener = (response: SerialPortResponse) => {
        clearTimeout(timeout)
        resolve(response)
      }

      timeout = setTimeout(() => {
        this.#responseEmitter.removeListener(`response-${id}`, listener)

        super.flush(() => {
          reject(new SerialPortError(SerialPortErrorType.ResponseTimeout, id))
        })
      }, timeoutMs)

      this.#responseEmitter.once(`response-${id}`, listener)
    })
  }

  write(data: unknown) {
    try {
      const parsedData = this.parseRequest(data)
      if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
        console.log(
          styleText(["bold", "bgCyan"], "SerialPort write"),
          styleText(["bgCyan"], this.path),
          styleText(["cyan"], `${sliceLogs(parsedData?.toString())}`)
        )
      }
      return super.write(parsedData)
    } catch (error) {
      if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
        console.log(
          styleText(["bold", "bgRed"], "SerialPort write parse error"),
          styleText(["bgRed"], this.path),
          styleText(
            ["red"],
            error instanceof SerialPortError
              ? error.type
              : error instanceof Error
                ? error.message
                : String(error)
          ),
          "\n"
        )
      }
      throw new SerialPortError(SerialPortErrorType.InvalidRequest)
    }
  }

  parseRequest(data: unknown) {
    return data
  }

  private createRequest({ options, ...data }: SerialPortRequest) {
    const id = parseInt(uniqueId()) % 99999999 || 1
    return new Promise<SerialPortResponse>((resolve, reject) => {
      void this.#queue.add(async () => {
        try {
          const enrichedData = set(clone(data), this.requestIdKey, id)
          this.write(enrichedData)
          const response = await this.listenForResponse(
            id,
            options?.timeout || DEFAULT_RESPONSE_TIMEOUT
          )
          resolve(response)
        } catch (error) {
          if (error instanceof SerialPortError) {
            reject(error)
            return
          }
          reject(new SerialPortError(error))
        }
      })
    })
  }

  async request({
    options,
    ...data
  }: SerialPortRequest): ReturnType<typeof this.createRequest> {
    const maxRetries = options?.retries || 0

    try {
      return await this.createRequest({ options, ...data })
    } catch (error) {
      if (maxRetries > 0) {
        return this.request({
          options: {
            ...options,
            retries: maxRetries - 1,
          },
          ...data,
        })
      } else {
        throw error
      }
    }
  }

  async drainAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      super.drain((error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  async closeAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      super.close((error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  async destroyAsync(error?: Error): Promise<this> {
    try {
      this.#responseEmitter.removeAllListeners()
      this.#queue.clear()

      if (this.isOpen) {
        await this.drainAsync()
        await this.closeAsync()
        super.destroy(error)
      } else {
        super.destroy(error)
      }
      return this
    } catch (err) {
      if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
        console.log(
          styleText(["bold", "bgRed"], "SerialPort destroy error"),
          styleText(["bgRed"], this.path),
          styleText(
            ["red"],
            err instanceof SerialPortError
              ? err.type
              : err instanceof Error
                ? err.message
                : String(err)
          ),
          "\n"
        )
      }
      return this
    }
  }

  async waitForOpen(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (super.isOpen) {
        resolve()
        return
      }

      const onOpen = () => {
        super.removeListener("error", onError)
        resolve()
      }

      const onError = (error: Error) => {
        super.removeListener("open", onOpen)
        reject(error)
      }

      super.once("open", onOpen)
      super.once("error", onError)
    })
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

const sliceLogs = (text = "") => {
  if (LOG_CHARS_LIMIT > 0) {
    return [
      text.slice(0, LOG_CHARS_LIMIT),
      text.length > LOG_CHARS_LIMIT ? "..." : "",
    ].join("")
  }
  return text
}
