/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TextEncoder } from "util"
import { RequestPayload, Response } from "Core/device/types/mudita-os"
import { PacketType } from "Core/device/modules/mudita-os/constants"
import { SerialPortParserBase } from "Core/device/modules/mudita-os/parsers/serial-port-base.parser"
import { APIRequestData } from "Libs/device/models/src"

enum State {
  Idle,
  ReceivedPartialHeader,
  ReceivedPartialPayload,
}

export class SerialPortParser extends SerialPortParserBase {
  private headerLength = 10

  private parserState = State.Idle
  private header = Buffer.alloc(0)
  private payload = Buffer.alloc(0)
  private expectedPayloadLength = 0

  public parse(data: Buffer): undefined | Response {
    switch (this.parserState) {
      case State.Idle:
        return this.parseNewHeader(data)
      case State.ReceivedPartialHeader:
        return this.parsePartialHeader(data)
      case State.ReceivedPartialPayload:
        return this.parsePartialPayload(data)
    }
  }

  private parseNewHeader(data: Buffer): undefined | Response {
    const endpointMarker = data[0]
    if (
      endpointMarker !== PacketType.Endpoint &&
      endpointMarker !== PacketType.RawData
    ) {
      throw new Error(
        `Invalid or unknown message type: '${String.fromCharCode(
          endpointMarker
        )}'`
      )
    }

    if (data.length < this.headerLength) {
      this.header = Buffer.concat([this.header, data])
      this.parserState = State.ReceivedPartialHeader
      return undefined
    } else {
      this.header = data.subarray(0, this.headerLength)
      this.updateExpectedPayloadLength()
      return this.parseNewPayload(data.subarray(this.headerLength)) // Pass rest of the received data without header
    }
  }

  private parsePartialHeader(data: Buffer): undefined | Response {
    const remainingHeaderLength = this.headerLength - this.header.length
    if (data.length < remainingHeaderLength) {
      this.header = Buffer.concat([this.header, data])
      return undefined
    } else {
      this.header = Buffer.concat([
        this.header,
        data.subarray(0, remainingHeaderLength),
      ])
      this.updateExpectedPayloadLength()
      return this.parseNewPayload(data.subarray(remainingHeaderLength))
    }
  }

  private parseNewPayload(data: Buffer): undefined | Response {
    if (data.length < this.expectedPayloadLength) {
      this.payload = Buffer.concat([this.payload, data]) // Message split to chunks, insert next chunk
      this.parserState = State.ReceivedPartialPayload
      return undefined
    }
    if (data.length == this.expectedPayloadLength) {
      this.payload = data
      return this.parsePayload() // All message received in one chunk
    }
    return undefined // Corrupted message
  }

  private parsePartialPayload(data: Buffer): undefined | Response {
    const remainingPayloadLength = this.expectedPayloadLength - this.payload.length
    if (data.length < remainingPayloadLength) {
      this.payload = Buffer.concat([this.payload, data])
      return undefined
    }
    if (data.length == remainingPayloadLength) {
      this.payload = Buffer.concat([this.payload, data])
      return this.parsePayload() // Whole message received, parse it
    }
    return undefined // Corrupted message
  }

  private parsePayload(): undefined | Response {
    const parsedMessage = JSON.parse(this.payload.toString()) as Response
    this.resetState()
    return parsedMessage
  }

  private updateExpectedPayloadLength(): void {
    this.expectedPayloadLength = Number(this.header.subarray(1, this.headerLength)) // Skip message marker
    if (isNaN(this.expectedPayloadLength) || this.expectedPayloadLength === 0) {
      throw new Error(`Can't parse data size as number`)
    }
  }

  private resetState(): void {
    this.header = Buffer.alloc(0)
    this.payload = Buffer.alloc(0)
    this.expectedPayloadLength = 0

    this.parserState = State.Idle
  }

  public createRequest(
    payload: RequestPayload<unknown> | APIRequestData
  ): string {
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
