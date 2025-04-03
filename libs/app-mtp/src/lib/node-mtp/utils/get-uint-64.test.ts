/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getUint64 } from "./get-uint-64"

describe("getUint64", () => {
  it("should correctly decode a 64-bit value in little-endian format", () => {
    const buffer = new ArrayBuffer(8)
    const bytes = new DataView(buffer)

    bytes.setUint32(0, 0x05060708, true)
    bytes.setUint32(4, 0x01020304, true)

    const result = getUint64(bytes, 0, true)
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const expected = 0x0102030405060708

    expect(result).toEqual(expected)
  })

  it("should correctly decode a 64-bit value in big-endian format", () => {
    const buffer = new ArrayBuffer(8)
    const bytes = new DataView(buffer)

    bytes.setUint32(0, 0x01020304, false)
    bytes.setUint32(4, 0x05060708, false)

    const result = getUint64(bytes, 0, false)
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const expected = 0x0102030405060708

    expect(result).toEqual(expected)
  })

  it("should return 0 when all bytes are zero", () => {
    const buffer = new ArrayBuffer(8)
    const bytes = new DataView(buffer)

    bytes.setUint32(0, 0, true)
    bytes.setUint32(4, 0, true)

    const result = getUint64(bytes, 0, true)
    const expected = 0

    expect(result).toEqual(expected)
  })

  it("should correctly handle a large value in little-endian format", () => {
    const buffer = new ArrayBuffer(8)
    const bytes = new DataView(buffer)

    bytes.setUint32(0, 0xffffffff, true)
    bytes.setUint32(4, 0xffffffff, true)

    const result = getUint64(bytes, 0, true)
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const expected = 0xffffffffffffffff

    expect(result).toEqual(expected)
  })

  it("should correctly handle a large value in big-endian format", () => {
    const buffer = new ArrayBuffer(8)
    const bytes = new DataView(buffer)

    bytes.setUint32(0, 0xffffffff, false)
    bytes.setUint32(4, 0xffffffff, false)

    const result = getUint64(bytes, 0, false)
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const expected = 0xffffffffffffffff

    expect(result).toEqual(expected)
  })

  it("should decode a value with different upper and lower 32 bits in little-endian format", () => {
    const buffer = new ArrayBuffer(8)
    const bytes = new DataView(buffer)

    bytes.setUint32(0, 0x09abcdef, true)
    bytes.setUint32(4, 0x12345678, true)

    const result = getUint64(bytes, 0, true)
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const expected = 0x1234567809abcdef

    expect(result).toEqual(expected)
  })

  it("should decode a value with different upper and lower 32 bits in big-endian format", () => {
    const buffer = new ArrayBuffer(8)
    const bytes = new DataView(buffer)

    bytes.setUint32(0, 0x12345678, false)
    bytes.setUint32(4, 0x09abcdef, false)

    const result = getUint64(bytes, 0, false)
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const expected = 0x1234567809abcdef

    expect(result).toEqual(expected)
  })
})
