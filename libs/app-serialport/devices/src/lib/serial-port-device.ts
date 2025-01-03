/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPort, SerialPortOpenOptions } from "serialport"
import { AutoDetectTypes } from "@serialport/bindings-cpp"
import { Transform } from "stream"
import {
  SerialPortDeviceType,
  SerialPortError,
  SerialPortRequest,
  SerialPortResponse,
} from "app-serialport/models"
import { get, set, uniqueId } from "lodash"
import EventEmitter from "events"
import PQueue from "p-queue"

const DEFAULT_QUEUE_INTERVAL = 1
const DEFAULT_QUEUE_CONCURRENCY = 1
const DEFAULT_RESPONSE_TIMEOUT = 30000

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
  private responseEmitter = new EventEmitter()
  private queue: PQueue
  static deviceType: SerialPortDeviceType
  static matchingVendorIds: string[] = []
  static matchingProductIds: string[] = []
  requestIdKey = "id"

  constructor(
    {
      queueInterval = DEFAULT_QUEUE_INTERVAL,
      queueConcurrency = DEFAULT_QUEUE_CONCURRENCY,
      ...options
    }: BaseSerialPortDeviceOptions,
    parser?: Transform
  ) {
    super(options)
    this.queue = new PQueue({
      concurrency: queueConcurrency,
      interval: queueInterval,
    })
    if (parser) {
      super.pipe(parser).on("data", (data) => this.parseResponse(data))
    }
  }

  private parseResponse(buffer: Buffer) {
    const response = JSON.parse(buffer.toString())
    try {
      const id = get(response, this.requestIdKey)
      if (!id) {
        console.error(SerialPortError.ResponseWithoutId)
      }
      this.responseEmitter.emit(`response-${id}`, response)
    } catch {
      console.error(SerialPortError.InvalidResponse)
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
        super.flush()
        this.responseEmitter.removeListener(`response-${id}`, listener)
        reject(SerialPortError.ResponseTimeout)
      }, timeoutMs)

      this.responseEmitter.once(`response-${id}`, listener)
    })
  }

  write(data: unknown) {
    try {
      const parsedData = this.parseRequest(data)
      return super.write(parsedData)
    } catch {
      throw SerialPortError.InvalidRequest
    }
  }

  parseRequest(data: unknown) {
    return data
  }

  async request(data: SerialPortRequest) {
    const id = parseInt(uniqueId())
    return new Promise<SerialPortResponse>((resolve, reject) => {
      void this.queue.add(async () => {
        try {
          const enrichedData = set({ ...data }, this.requestIdKey, id)
          this.write(enrichedData)
          const response = await this.listenForResponse(
            id,
            enrichedData.options?.timeout || DEFAULT_RESPONSE_TIMEOUT
          )
          resolve(response)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  destroy(error?: Error): this {
    return super.destroy(error)
  }
}
