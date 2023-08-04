/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TextEncoder } from "util"
import { RequestPayload, Response } from "App/device/types/mudita-os"
import { SerialPortParserBase } from "App/device/modules/mudita-os/parsers/serial-port-base.parser"
import { ResponseStatus } from "App/device/constants"

enum PacketType {
  Invalid = '"',
  Endpoint = 64,
  RawData = 36,
}

enum Endpoint {
  DeviceInfo = 1,
}

enum Method {
  GET = 1,
  POST = 2,
  PUT = 3,
  DELETE = 4,
}

interface Header {
  endpoint: Endpoint
  method: Method
  offset: number
  limit: number
  uuid: number
  status: ResponseStatus
  contd: boolean
}

enum BatteryState {
  UNKNOWN = 1,
  CHARGING = 2,
  DISCHARGING = 3,
  NOT_CHARGING = 4,
  FULL = 5,
}

enum NetworkStatus {
  IN_SERVICE = 0,
  OUT_OF_SERVICE = 1,
  EMERGENCY_ONLY = 2,
  POWER_OFF = 3,
  UNKNOWN = 4,
}

interface SimCard {
  simSlot: number
  networkOperatorName: string
  signalStrength: number
  networkStatus: NetworkStatus
}

type Payload = {
  serialNumber: string
  version: number
  batteryState: BatteryState
  batteryCapacity: number
  simCards: SimCard[]
}

interface PayloadError {
  message: string
}

export type KompaktBody = Payload & Omit<Header, "status | uuid">

enum Prefix {
  REQUEST = "?",
  RESPONSE = "@",
}

const PREFIX_LENGTH = 1
const HEADER_LENGTH = 9
const BODY_LENGTH = 9

export class SerialPortParserKompakt extends SerialPortParserBase {
  public parse(data: Buffer): Response<KompaktBody> | undefined {
    try {
      const prefix = String.fromCharCode(data[0])

      if (prefix === Prefix.RESPONSE) {
        const headerSize = Number(data.subarray(1, 10).valueOf())
        const payloadSize = Number(data.subarray(10, 19).valueOf())
        const headerBuffer = data.subarray(19, 19 + headerSize)
        const header = JSON.parse(headerBuffer.toString()) as Header
        const payloadBuffer = data.subarray(
          19 + headerSize,
          19 + headerSize + payloadSize
        )
        const payload = this.parsePayload(payloadBuffer)

        return this.mapToResponse(header, payload)
      } else {
        //throw incorrect data type
      }
    } catch (ex) {
      console.log("ex", ex)
    }
    return undefined
  }

  private parsePayload(payloadBuffer: Buffer): Payload {
    const payload = payloadBuffer.toString().split("\n").join()
    const payload2 = Buffer.from(payload, "base64").toString()
    return JSON.parse(payload2)
  }

  private mapToResponse(
    { status, uuid, ...headerRest }: Header,
    payload: Payload
  ): Response<KompaktBody> {
    return {
      status: status,
      body: {
        ...payload,
        ...headerRest,
      },
      error: undefined,
      uuid: uuid,
    } as Response<KompaktBody>
  }

  public createRequest(payload: RequestPayload<unknown>): string {
    const encoder = new TextEncoder()

    const { endpoint, method, offset, limit, uuid, ...body } = payload

    const headerAsString = JSON.stringify({
      endpoint,
      method,
      offset,
      limit,
      uuid,
    })
    const headerLength = String(encoder.encode(headerAsString).length).padStart(
      9,
      "0"
    )

    const bodyAsString = JSON.stringify(body)
    const bodyLength = String(encoder.encode(bodyAsString).length).padStart(
      9,
      "0"
    )

    return `${Prefix.REQUEST}${headerLength}${bodyLength}${headerAsString}${bodyAsString}`
  }
}
