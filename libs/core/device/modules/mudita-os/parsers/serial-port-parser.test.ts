/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortParser } from "./serial-port.parser"
import { RequestPayload } from "Core/device/types/mudita-os"

describe("`Parser.createValidRequest`", () => {
  const parser = new SerialPortParser()
  test("`payload` created properly ", () => {
    const payload: RequestPayload = {
      endpoint: 1,
      method: 1,
      uuid: 0,
    }
    expect(parser.createRequest(payload)).toEqual(
      '#000000034{"endpoint":1,"method":1,"uuid":0}'
    )
  })
})

describe("`Parser.parse`", () => {
  describe("when header is split into multiple packets", () => {
    const parser = new SerialPortParser()
    const endpoint = Buffer.from([35])
    const payload = { entry: [] }
    const payloadStringify = JSON.stringify(payload)
    const payloadStringifyLength = JSON.stringify(payload).length
    const size = Buffer.from(
      String(payloadStringifyLength).padStart(9, "0"),
      "utf-8"
    )

    const payloadAsBuffer = Buffer.from(payloadStringify, 'utf-8')
    const fullPacket = Buffer.concat([endpoint, size, payloadAsBuffer])
    const splitPoint = 3
    const firstBuffer = fullPacket.subarray(0, splitPoint)
    const secondBuffer = fullPacket.subarray(splitPoint)

    test("method correctly parse message split at header", () => {
      parser.parse(firstBuffer)
      expect(parser.parse(secondBuffer)).toEqual(payload)
    })
  })

  describe("when data is packed in single packet", () => {
    const parser = new SerialPortParser()
    const endpoint = Buffer.from([35])
    const payload = { entry: [] }
    const payloadStringify = JSON.stringify(payload)
    const payloadStringifyLength = payloadStringify.length
    const size = Buffer.from(
      String(payloadStringifyLength).padStart(9, "0"),
      "utf-8"
    )
    const payloadAsBuffer = Buffer.from(payloadStringify, "utf-8")
    const buffer = Buffer.concat([endpoint, size, payloadAsBuffer])

    test("payload is return properly", () => {
      expect(parser.parse(buffer)).toEqual(payload)
    })
  })

  describe("when endpoint is unknown", () => {
    const parser = new SerialPortParser()
    const endpoint = Buffer.from([999])
    const payload = { entry: [] }
    const payloadStringify = JSON.stringify(payload)
    const payloadStringifyLength = payloadStringify.length
    const size = Buffer.from(
      String(payloadStringifyLength).padStart(9, "0"),
      "utf-8"
    )
    const payloadAsBuffer = Buffer.from(payloadStringify, "utf-8")
    const buffer = Buffer.concat([endpoint, size, payloadAsBuffer])

    test("method thrown error", () => {
      expect(() => parser.parse(buffer)).toThrow()
    })
  })

  describe("when size is NaN", () => {
    const parser = new SerialPortParser()
    const endpoint = Buffer.from([35])
    const payload = { entry: [] }
    const payloadStringify = JSON.stringify(payload)
    const size = Buffer.from(String("bad_number").padStart(9, "0"), "utf-8")
    const payloadAsBuffer = Buffer.from(payloadStringify, "utf-8")
    const buffer = Buffer.concat([endpoint, size, payloadAsBuffer])

    test("method thrown error", () => {
      expect(() => parser.parse(buffer)).toThrow()
    })
  })

  describe("when data is chunks to more than one packet", () => {
    const parser = new SerialPortParser()
    const endpoint = Buffer.from([35])
    const payload = { entry: [] }
    const payloadStringify = JSON.stringify(payload)
    const payloadStringifyLength = JSON.stringify(payload).length
    const firstPayload = payloadStringify.slice(0, 6)
    const secondPayload = payloadStringify.slice(6)
    const size = Buffer.from(
      String(payloadStringifyLength).padStart(9, "0"),
      "utf-8"
    )
    const firstPacketPayload = Buffer.from(firstPayload, "utf-8")
    const firstBuffer = Buffer.concat([endpoint, size, firstPacketPayload])
    const secondPacketPayload = Buffer.from(secondPayload, "utf-8")
    const secondBuffer = Buffer.concat([secondPacketPayload])

    test("method concatenate whole payload", () => {
      parser.parse(firstBuffer)
      expect(parser.parse(secondBuffer)).toEqual(payload)
    })
  })
})
