/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortParser } from "./serial-port-parser"
import { RequestPayload } from "./types"

describe("`Parser.createValidRequest`", () => {
  test("`payload` created properly ", () => {
    const payload: RequestPayload = {
      endpoint: 1,
      method: 1,
      uuid: 0,
    }
    expect(SerialPortParser.createValidRequest(payload)).toEqual(
      '#000000034{"endpoint":1,"method":1,"uuid":0}'
    )
  })
})

describe("`Parser.parseData`", () => {
  describe("when data is packed in single packet", () => {
    const parser = new SerialPortParser()
    const endpoint = Buffer.from([35])
    const paylaod = { entry: [] }
    const payloadStringify = JSON.stringify(paylaod)
    const payloadStringifyLength = payloadStringify.length
    const size = Buffer.from(
      String(payloadStringifyLength).padStart(9, "0"),
      "utf-8"
    )
    const payload = Buffer.from(payloadStringify, "utf-8")
    const buffer = Buffer.concat([endpoint, size, payload])

    test("payload is return properly", () => {
      expect(parser.parseData(buffer)).toEqual(paylaod)
    })
  })

  describe("when endpoint is unknown", () => {
    const parser = new SerialPortParser()
    const endpoint = Buffer.from([999])
    const paylaod = { entry: [] }
    const payloadStringify = JSON.stringify(paylaod)
    const payloadStringifyLength = payloadStringify.length
    const size = Buffer.from(
      String(payloadStringifyLength).padStart(9, "0"),
      "utf-8"
    )
    const payload = Buffer.from(payloadStringify, "utf-8")
    const buffer = Buffer.concat([endpoint, size, payload])

    test("method thrown error", () => {
      expect(() => parser.parseData(buffer)).toThrow()
    })
  })

  describe("when size is NaN", () => {
    const parser = new SerialPortParser()
    const endpoint = Buffer.from([35])
    const paylaod = { entry: [] }
    const payloadStringify = JSON.stringify(paylaod)
    const size = Buffer.from(String("bad_number").padStart(9, "0"), "utf-8")
    const payload = Buffer.from(payloadStringify, "utf-8")
    const buffer = Buffer.concat([endpoint, size, payload])

    test("method thrown error", () => {
      expect(() => parser.parseData(buffer)).toThrow()
    })
  })

  describe("when data is chunks to more than one packet", () => {
    const parser = new SerialPortParser()
    const endpoint = Buffer.from([35])
    const paylaod = { entry: [] }
    const payloadStringify = JSON.stringify(paylaod)
    const payloadStringifyLength = JSON.stringify(paylaod).length
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
      parser.parseData(firstBuffer)
      expect(parser.parseData(secondBuffer)).toEqual(paylaod)
    })
  })
})
