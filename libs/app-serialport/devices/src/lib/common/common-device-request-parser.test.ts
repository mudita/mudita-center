/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { commonDeviceRequestParser } from "./common-device-request-parser"
import { SerialPortRequest } from "app-serialport/models"

describe("apiDeviceRequestParser", () => {
  const request: SerialPortRequest = {
    rid: 1,
    endpoint: "API_CONFIGURATION",
    method: "GET",
  }

  it("returns a proper starting with #", () => {
    const result = commonDeviceRequestParser(request)
    expect(result[0]).toBe("#")
  })

  it("properly calculates the length of the payload", () => {
    const result = commonDeviceRequestParser(request)
    expect(result.slice(1, 10)).toBe("000000055")
  })

  it("properly attaches the payload", () => {
    const result = commonDeviceRequestParser(request)
    expect(result.slice(10)).toBe(JSON.stringify(request))
  })

  it("properly encodes the payload length", () => {
    const longRequest: SerialPortRequest = {
      rid: 1,
      endpoint: "API_CONFIGURATION",
      method: "GET",
      data: "a".repeat(1000),
    }
    const result = commonDeviceRequestParser(longRequest)
    expect(result.slice(1, 10)).toBe("000001065")
  })

  it("properly encodes the payload length for non-ASCII characters", () => {
    const nonAsciiRequest = {
      status: "ok",
      value: "こんにちは",
    }

    const result = commonDeviceRequestParser(nonAsciiRequest)

    expect(result.slice(1, 10)).toBe("000000041")
  })

  it("properly encodes the payload length for empty payload", () => {
    const emptyRequest = {}

    const result = commonDeviceRequestParser(emptyRequest)

    expect(result.slice(1, 10)).toBe("000000002")
  })
})
