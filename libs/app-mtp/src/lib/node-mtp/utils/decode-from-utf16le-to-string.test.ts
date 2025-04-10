/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { decodeFromUtf16leToString } from "./decode-from-utf16le-to-string"

describe("parseTextFromBuffer", () => {
  it("should correctly parse text with null terminator", () => {
    const buffer = new ArrayBuffer(11)
    const bytes = new DataView(buffer)

    const string = "Test"
    const encoder = new TextEncoder()
    const encoded = encoder.encode(string)

    const utf16leEncoded = new Uint8Array(string.length * 2 + 2)
    for (let i = 0; i < string.length; i++) {
      utf16leEncoded[i * 2] = encoded[i]
      utf16leEncoded[i * 2 + 1] = 0
    }
    utf16leEncoded[string.length * 2] = 0
    utf16leEncoded[string.length * 2 + 1] = 0

    bytes.setUint8(0, string.length + 1)

    for (let i = 0; i < utf16leEncoded.length; i++) {
      bytes.setUint8(i + 1, utf16leEncoded[i])
    }

    const result = decodeFromUtf16leToString(buffer, 0)
    expect(result).toEqual(string)
  })

  it("should throw an error if null terminator is missing", () => {
    const buffer = new ArrayBuffer(9)
    const bytes = new DataView(buffer)

    const string = "Test"
    const encoder = new TextEncoder()
    const encoded = encoder.encode(string)

    const utf16leEncoded = new Uint8Array(string.length * 2)
    for (let i = 0; i < string.length; i++) {
      utf16leEncoded[i * 2] = encoded[i]
      utf16leEncoded[i * 2 + 1] = 0
    }

    bytes.setUint8(0, string.length)

    for (let i = 0; i < utf16leEncoded.length; i++) {
      bytes.setUint8(i + 1, utf16leEncoded[i])
    }

    expect(() => decodeFromUtf16leToString(buffer, 0)).toThrowError(
      "Missing null terminator at the end of the string"
    )
  })

  it("should return an empty string for empty text (length 0)", () => {
    const buffer = new ArrayBuffer(1)
    const bytes = new DataView(buffer)

    bytes.setUint8(0, 0)

    const result = decodeFromUtf16leToString(buffer, 0)
    expect(result).toEqual("")
  })

  it("should return an empty string for empty text (length 1 with null terminator)", () => {
    const buffer = new ArrayBuffer(3)
    const bytes = new DataView(buffer)

    bytes.setUint8(0, 1)
    bytes.setUint8(1, 0)
    bytes.setUint8(2, 0)

    const result = decodeFromUtf16leToString(buffer, 0)
    expect(result).toEqual("")
  })
})
