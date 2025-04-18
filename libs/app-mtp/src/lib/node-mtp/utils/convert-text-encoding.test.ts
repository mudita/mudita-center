/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { convertTextEncoding } from "./convert-text-encoding"

describe("convertTextEncoding", () => {
  it("should correctly convert UTF-8 to UTF-16LE", () => {
    const text = "test"
    const result = convertTextEncoding(text, "utf-8", "utf16le")

    // Encoding the text to UTF-16LE manually to compare
    const expected = new TextEncoder().encode(text).reduce((arr, byte) => {
      arr.push(byte, 0) // UTF-16LE uses a 2-byte representation
      return arr
    }, [] as number[])

    expect(new Uint8Array(result)).toEqual(new Uint8Array(expected))
  })

  it("should correctly convert UTF-16LE to UTF-8", () => {
    const text = "test"
    const utf16leBuffer = new TextEncoder().encode(text).reduce((arr, byte) => {
      arr.push(byte, 0) // Add a null byte for UTF-16LE
      return arr
    }, [] as number[])

    const result = convertTextEncoding(
      new TextDecoder("utf-16le").decode(new Uint8Array(utf16leBuffer)),
      "utf16le",
      "utf-8"
    )

    const expected = new TextEncoder().encode(text)

    expect(new Uint8Array(result)).toEqual(new Uint8Array(expected))
  })

  it("should throw an error for unsupported encoding formats", () => {
    expect(() =>
      // @ts-ignore
      convertTextEncoding("test", "invalid-encoding", "utf-8")
    ).toThrowError()
    expect(() =>
      // @ts-ignore
      convertTextEncoding("test", "utf-8", "invalid-encoding")
    ).toThrowError()
  })

  it("should return an empty buffer for an empty string", () => {
    const result = convertTextEncoding("", "utf-8", "utf16le")
    expect(result).toEqual(Buffer.from([]))
  })

  it("should handle large text without errors", () => {
    const largeText = "a".repeat(10000) // A large string
    const result = convertTextEncoding(largeText, "utf-8", "utf16le")

    const expected = new TextEncoder().encode(largeText).reduce((arr, byte) => {
      arr.push(byte, 0) // UTF-16LE representation
      return arr
    }, [] as number[])

    expect(new Uint8Array(result)).toEqual(new Uint8Array(expected))
  })
})
