/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPort, SerialPortOpenOptions } from "serialport"
import { AutoDetectTypes } from "@serialport/bindings-cpp"
import { Transform } from "stream"
import { APIRequestData, APIResponseData } from "app-serialport/models"
import { uniqueId } from "lodash"
import EventEmitter from "events"
import PQueue from "p-queue"

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
  matchingVendorIds: string[] = []
  matchingProductIds: string[] = []
  idKey = "id"

  constructor(
    {
      queueInterval = 1,
      queueConcurrency = 1,
      ...options
    }: BaseSerialPortDeviceOptions,
    parser: Transform
  ) {
    super(options)
    this.queue = new PQueue({
      concurrency: queueConcurrency,
      interval: queueInterval,
    })
    super.pipe(parser).on("data", (buffer: Buffer) => {
      const data = JSON.parse(buffer.toString())
      if (this.idKey in data) {
        this.responseEmitter.emit(`response-${data[this.idKey]}`, data)
      }
    })
  }

  private listenForResponse(id: number | string) {
    return new Promise((resolve) => {
      this.responseEmitter.once(
        `response-${id}`,
        (response: APIResponseData) => {
          resolve(response)
        }
      )
    })
  }

  write(data: unknown) {
    return super.write(this.parseRequest(data))
  }

  parseRequest(data: unknown) {
    return data
  }

  async request(data: APIRequestData) {
    const id = parseInt(uniqueId())

    return new Promise((resolve) => {
      void this.queue.add(async () => {
        this.write({ ...data, [this.idKey]: id })
        const response = await this.listenForResponse(id)
        resolve(response)
      })
    })
  }

  destroy(error?: Error): this {
    return super.destroy(error)
  }
}
