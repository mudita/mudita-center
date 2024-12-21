/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  apiDeviceRequestParser,
  ApiDeviceRequest,
} from "./api-device-request-parser"

describe("apiDeviceRequestParser", () => {
  const request: ApiDeviceRequest = {
    rid: 1,
    endpoint: "API_CONFIGURATION",
    method: "GET",
  }

  it("returns a proper starting with #", () => {
    const result = apiDeviceRequestParser(request)
    expect(result[0]).toBe("#")
  })

  it("properly calculates the length of the payload", () => {
    const result = apiDeviceRequestParser(request)
    expect(result.slice(1, 10)).toBe("000000055")
  })

  it("properly attaches the payload", () => {
    const result = apiDeviceRequestParser(request)
    expect(result.slice(10)).toBe(JSON.stringify(request))
  })
})
