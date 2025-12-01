/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortMock, SerialPortOpenOptions } from "serialport"
import { AutoDetectTypes } from "@serialport/bindings-cpp"
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
const DEFAULT_RESPONSE_TIMEOUT = 30000

type BaseSerialPortDeviceOptions = SerialPortOpenOptions<AutoDetectTypes> & {
  queueInterval?: number
  queueConcurrency?: number
}

export class SerialPortDeviceMock extends SerialPortMock {
  static readonly deviceType: SerialPortDeviceType
  static readonly matchingVendorIds: string[] = []
  static readonly matchingProductIds: string[] = []
  static readonly nonSerialPortDevice = true
  readonly requestIdKey: string = "id"
  #responseEmitter = new EventEmitter()
  #queue: PQueue

  constructor({
    queueInterval = DEFAULT_QUEUE_INTERVAL,
    queueConcurrency = DEFAULT_QUEUE_CONCURRENCY,
    ...options
  }: BaseSerialPortDeviceOptions) {
    SerialPortMock.binding.createPort(options.path)
    super({ ...options, autoOpen: true })

    this.#queue = new PQueue({
      concurrency: queueConcurrency,
      interval: queueInterval,
    })
    super.on("data", (data) => this.parseResponse(data))
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

  async request({
    options,
    ...data
  }: SerialPortRequest): ReturnType<typeof this.createRequest> {
    const maxRetries = options?.retries || 0

    try {
      return await this.createRequest({ options, ...data })
    } catch (error) {
      if (maxRetries > 0) {
        return await this.request({
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

  destroy(error?: Error): this {
    return super.destroy(error)
  }

  emitData(id: number, data: unknown) {
    super.emit("data", JSON.stringify({ id, data }))
  }

  private parseResponse(buffer: Buffer) {
    const rawResponse = buffer.toString()
    if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
      console.log(
        styleText(["bold", "bgMagenta"], "SerialPort response"),
        styleText(["bgMagenta"], this.path),
        styleText(["magenta"], `${rawResponse}`),
        "\n"
      )
    }
    const response = JSON.parse(rawResponse)
    const id = get(response, this.requestIdKey)
    if (!id) {
      throw new SerialPortError(SerialPortErrorType.ResponseWithoutId)
    }
    this.#responseEmitter.emit(`response-${id}`, response)
  }

  private listenForResponse(id: number | string, timeoutMs: number) {
    let timeout: NodeJS.Timeout

    return new Promise<SerialPortResponse>((resolve, reject) => {
      const listener = (response: SerialPortResponse) => {
        clearTimeout(timeout)
        resolve(response)
      }

      timeout = setTimeout(() => {
        super.drain()
        this.#responseEmitter.removeListener(`response-${id}`, listener)
        reject(new SerialPortError(SerialPortErrorType.ResponseTimeout, id))
      }, timeoutMs)

      this.#responseEmitter.once(`response-${id}`, listener)
    })
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
          reject(new SerialPortError(error))
        }
      })
    })
  }
}
