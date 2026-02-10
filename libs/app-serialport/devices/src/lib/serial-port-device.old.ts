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
const DEFAULT_RESPONSE_TIMEOUT = 30_000
const DEFAULT_OPEN_RETRIES = 5
const DEFAULT_OPEN_TIMEOUT = 5_000
const LOG_CHARS_LIMIT = Number(process.env.SERIALPORT_LOG_LIMIT || 0)

enum PortState {
  Closed = "closed",
  Opening = "opening",
  Open = "open",
  Closing = "closing",
  Destroyed = "destroyed",
}

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
  #portState: PortState = PortState.Closed
  #statePromise: Promise<void> | null = null

  static readonly deviceType: SerialPortDeviceType
  static readonly matchingVendorIds: string[] = []
  static readonly matchingProductIds: string[] = []
  static readonly nonSerialPortDevice: boolean = false
  readonly requestIdKey: string = "id"

  get isOpening(): boolean {
    return this.#portState === PortState.Opening
  }

  get isClosing(): boolean {
    return this.#portState === PortState.Closing
  }

  get isDestroyed(): boolean {
    return this.#portState === PortState.Destroyed
  }

  get portState(): PortState {
    return this.#portState
  }

  constructor(
    {
      queueInterval = DEFAULT_QUEUE_INTERVAL,
      queueConcurrency = DEFAULT_QUEUE_CONCURRENCY,
      ...options
    }: BaseSerialPortDeviceOptions,
    parser?: Transform
  ) {
    super({ ...options, autoOpen: false })
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
          styleText(["bold", "bgMagenta"], " SerialPort response "),
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
          styleText(["bold", "bgRed"], " SerialPort response parse error "),
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
          styleText(["bold", "bgCyan"], " SerialPort write "),
          styleText(["bgCyan"], this.path),
          styleText(["cyan"], `${sliceLogs(parsedData?.toString())}`)
        )
      }
      return super.write(parsedData)
    } catch (error) {
      if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
        console.log(
          styleText(["bold", "bgRed"], " SerialPort write parse error "),
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
          // Wait for any pending state operation (opening/closing)
          if (this.#statePromise) {
            await this.#statePromise
          }

          // Check if port is ready for communication
          if (this.#portState === PortState.Destroyed) {
            throw new SerialPortError(SerialPortErrorType.PortNotOpen)
          }

          if (this.#portState === PortState.Closing) {
            throw new SerialPortError(SerialPortErrorType.PortNotOpen)
          }

          if (!this.isOpen) {
            throw new SerialPortError(SerialPortErrorType.PortNotOpen)
          }

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
    // Already destroyed
    if (this.#portState === PortState.Destroyed) {
      return this
    }

    // Wait for any pending state operation
    if (this.#statePromise) {
      try {
        await this.#statePromise
      } catch {
        // Ignore errors from pending operations
      }
    }

    this.#portState = PortState.Closing

    this.#statePromise = (async () => {
      try {
        // Stop accepting new requests and clear pending ones
        this.#queue.pause()
        this.#queue.clear()
        this.#responseEmitter.removeAllListeners()

        if (this.isOpen) {
          await this.drainAsync()
          await this.closeAsync()
        }

        super.destroy(error)
        this.#portState = PortState.Destroyed
      } catch (err) {
        if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
          console.log(
            styleText(["bold", "bgRed"], " SerialPort destroy error "),
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
        // Even on error, mark as destroyed to prevent further usage
        this.#portState = PortState.Destroyed
      } finally {
        this.#statePromise = null
      }
    })()

    await this.#statePromise
    return this
  }

  async openAsync(retries = DEFAULT_OPEN_RETRIES): Promise<void> {
    // Already open - nothing to do
    if (this.isOpen && this.#portState === PortState.Open) {
      return
    }

    // If opening/closing is in progress, wait for it to complete
    if (this.#statePromise) {
      await this.#statePromise
      // After waiting, check if we're now open
      if (this.isOpen) {
        return
      }
    }

    // Don't open if destroyed or closing
    if (this.#portState === PortState.Destroyed) {
      throw new SerialPortError(SerialPortErrorType.PortOpenError)
    }

    this.#portState = PortState.Opening

    const tryOpen = (retriesLeft: number): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        super.open((error) => {
          if (error && retriesLeft > 0) {
            this.waitForOpen()
              .then(resolve)
              .catch(() => {
                tryOpen(retriesLeft - 1)
                  .then(resolve)
                  .catch(reject)
              })
          } else if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      })
    }

    this.#statePromise = (async () => {
      try {
        await tryOpen(retries)
        this.#portState = PortState.Open
      } catch (error) {
        this.#portState = PortState.Closed
        if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
          console.log(
            styleText(["bold", "bgRed"], " SerialPort open error "),
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
        throw error
      } finally {
        this.#statePromise = null
      }
    })()

    return this.#statePromise
  }

   async waitForOpen(timeout = DEFAULT_OPEN_TIMEOUT): Promise<void> {
    return new Promise((resolve, reject) => {
      if (super.isOpen) {
        resolve()
        return
      }

      const timeoutId = setTimeout(() => {
        super.removeListener("open", onOpen)
        super.removeListener("error", onError)
        reject(new SerialPortError(SerialPortErrorType.PortOpenError))
      }, timeout)

      const onOpen = () => {
        super.removeListener("error", onError)
        clearTimeout(timeoutId)
        resolve()
      }

      const onError = (error: Error) => {
        super.removeListener("open", onOpen)
        clearTimeout(timeoutId)
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
