/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TextEncoder } from "util"
import { RequestPayload, Response } from "App/device/types/mudita-os"
import { PacketType } from "App/device/modules/mudita-os/constants"

export class SerialPortParser {
  private dataRaw = Buffer.alloc(0)
  private dataSizeToRead = -1
  private needMoreData = false

  public parse(data: Buffer): undefined | Response {
    if (this.needMoreData) {
      return this.readPayload(data)
    }

    const endpoint = data[0]

    if (
      !(endpoint === PacketType.Endpoint || endpoint === PacketType.RawData)
    ) {
      throw new Error("Invalid or unknown data type")
    }

    this.dataRaw = Buffer.alloc(0)

    const size = Number(data.slice(1, 10))

    if (isNaN(size) || size === 0) {
      throw new Error(`Can't parse data size as number`)
    }

    this.dataSizeToRead = size

    return this.readPayload(data.slice(10))
  }

  private readPayload(buffer: Buffer): undefined | Response {
    const corruptPacket = buffer.length > this.dataSizeToRead

    if (corruptPacket) {
      return undefined
    }

    this.dataRaw = Buffer.concat([this.dataRaw, buffer])
    this.needMoreData = this.dataRaw.length < this.dataSizeToRead

    if (this.needMoreData) {
      return undefined
    } else {
      return JSON.parse(this.dataRaw.toString()) as Response
    }
  }

  static createValidRequest(payload: RequestPayload<unknown>): string {
    const encoder = new TextEncoder()

    let requestStr = "#"
    const payloadAsString = JSON.stringify(payload)
    const sizeAsString = String(
      encoder.encode(payloadAsString).length
    ).padStart(9, "0")
    requestStr += sizeAsString
    requestStr += payloadAsString

    return requestStr
  }
}
