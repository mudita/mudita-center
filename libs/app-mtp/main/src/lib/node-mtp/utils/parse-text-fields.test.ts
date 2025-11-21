/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { parseTextFields } from "./parse-text-fields"
import { encodeToUtf16le } from "./encode-to-utf16le"

describe("parseTextFields", () => {
  it("should correctly parse multiple text fields", () => {
    const buffer = new ArrayBuffer(67)
    const bytes = new DataView(buffer)

    let offset = 0
    offset = encodeToUtf16le(bytes, offset, "Storage1")
    offset = encodeToUtf16le(bytes, offset, "Volume1")
    encodeToUtf16le(bytes, offset, "AdditionalText")

    const textFieldKeys = [
      "storageDescription",
      "volumeLabel",
      "additionalText",
    ]
    const result = parseTextFields(buffer, textFieldKeys, 0)

    const expected = {
      storageDescription: "Storage1",
      volumeLabel: "Volume1",
      additionalText: "AdditionalText",
    }

    expect(result).toEqual(expected)
  })

  it("should handle empty strings correctly", () => {
    const buffer = new ArrayBuffer(2)
    const bytes = new DataView(buffer)

    bytes.setUint8(0, 0)
    bytes.setUint8(1, 0)

    const textFieldKeys = ["storageDescription", "volumeLabel"]
    const result = parseTextFields(buffer, textFieldKeys, 0)

    const expected = {
      storageDescription: "",
      volumeLabel: "",
    }

    expect(result).toEqual(expected)
  })

  it("should handle empty strings correctly (length 1 with null terminator)", () => {
    const buffer = new ArrayBuffer(6)
    const bytes = new DataView(buffer)

    bytes.setUint8(0, 1)
    bytes.setUint8(1, 0)
    bytes.setUint8(2, 0)
    bytes.setUint8(3, 1)
    bytes.setUint8(4, 0)
    bytes.setUint8(5, 0)

    const textFieldKeys = ["storageDescription", "volumeLabel"]
    const result = parseTextFields(buffer, textFieldKeys, 0)

    const expected = {
      storageDescription: "",
      volumeLabel: "",
    }

    expect(result).toEqual(expected)
  })

  it("should throw an error if text field length is invalid", () => {
    const buffer = new ArrayBuffer(2)
    const bytes = new DataView(buffer)

    bytes.setUint8(0, 10)
    bytes.setUint8(1, 0)

    expect(() =>
      parseTextFields(buffer, ["storageDescription"], 0)
    ).toThrow("Invalid typed array length: 20")
  })
})
