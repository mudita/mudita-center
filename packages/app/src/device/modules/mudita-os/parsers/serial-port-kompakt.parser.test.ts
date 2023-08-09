/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortParserKompakt } from "App/device/modules/mudita-os/parsers"
import { RequestPayload } from "App/device/types/mudita-os"
import { PrefixKompakt } from "App/device/constants/prefix-kompakt.constant"
import { HeaderKompakt } from "App/device/types/kompakt/header-kompakt.type"
import { PayloadKompakt } from "App/device/types/kompakt/payload-kompakt.type"

describe("`Parser.createRequest`", () => {
  const parser = new SerialPortParserKompakt()
  test("request with empty body", () => {
    const payload: RequestPayload = {
      endpoint: 1,
      method: 1,
      uuid: 0,
    }

    const input = parser.createRequest(payload)
    const output = `${PrefixKompakt.REQUEST}000000055000000002{"endpoint":1,"method":1,"offset":0,"limit":1,"uuid":0}{}`

    expect(input).toEqual(output)
  })

  test("request with body", () => {
    type Body = {
      whatever: string
      someNum: number
    }

    const payload: RequestPayload<Body> = {
      endpoint: 1,
      method: 1,
      uuid: 0,
      body: {
        whatever: "blabla",
        someNum: 123,
      },
    }

    const input = parser.createRequest(payload)
    const output = `${PrefixKompakt.REQUEST}000000055000000035{"endpoint":1,"method":1,"offset":0,"limit":1,"uuid":0}{"whatever":"blabla","someNum":123}`

    expect(input).toEqual(output)
  })
})

const generateBuffor = (
  headerObj: HeaderKompakt,
  payloadObj: PayloadKompakt
): Buffer => {
  const prefixBuff = Buffer.from(PrefixKompakt.RESPONSE, "utf-8")

  const payload = JSON.stringify(payloadObj)
  const payloadBase64 = new Buffer(payload).toString("base64")
  const payloadBase64Buff = Buffer.from(payloadBase64, "utf-8")

  const header = JSON.stringify(headerObj)
  const headerBuff = Buffer.from(header, "utf-8")

  const headerSize = String(header.length).padStart(9, "0")
  const headerSizeBuff = Buffer.from(headerSize, "utf-8")

  const payloadSize = String(payloadBase64.length).padStart(9, "0")
  const payloadSizeBuff = Buffer.from(payloadSize, "utf-8")

  return Buffer.concat([
    prefixBuff,
    headerSizeBuff,
    payloadSizeBuff,
    headerBuff,
    payloadBase64Buff,
  ])
}

describe("SerialPortParserKompakt.parse", () => {
  const parser = new SerialPortParserKompakt()

  test("regular case", () => {
    const payloadObj = {
      serialNumber: "12345678901234",
      version: 31,
      batteryLevel: "68",
      batteryState: 2,
      batteryCapacity: 76,
      simCards: [
        {
          simSlot: 0,
          networkOperatorName: "Play",
          signalStrength: 2,
          networkStatus: 1,
        },
      ],
    }

    const headerObj = {
      endpoint: 1,
      method: 1,
      offset: 0,
      limit: 1,
      uuid: 5092,
      status: 200,
      contd: true,
    }

    const responseBuff = generateBuffor(headerObj, payloadObj)

    const { status, uuid, ...restHeader } = headerObj
    const result = {
      body: {
        ...payloadObj,
        ...restHeader,
      },
      error: undefined,
      status,
      uuid,
    }
    expect(parser.parse(responseBuff)).toEqual(result)
  })

  test("empty simCards - no card inserted", () => {
    const payloadObj = {
      serialNumber: "12345678901234",
      version: 31,
      batteryLevel: "68",
      batteryState: 2,
      batteryCapacity: 76,
      simCards: [],
    }

    const headerObj = {
      endpoint: 1,
      method: 1,
      offset: 0,
      limit: 1,
      uuid: 5092,
      status: 200,
      contd: true,
    }

    const responseBuff = generateBuffor(headerObj, payloadObj)

    const { status, uuid, ...restHeader } = headerObj
    const result = {
      body: {
        ...payloadObj,
        ...restHeader,
      },
      error: undefined,
      status,
      uuid,
    }
    expect(parser.parse(responseBuff)).toEqual(result)
  })
})
