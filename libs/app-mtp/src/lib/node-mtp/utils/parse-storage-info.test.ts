/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  parseStorageInfo,
  StorageInfo,
  StorageType,
} from "./parse-storage-info"
import { encodeToUtf16le } from "./encode-to-utf16le"

describe("parseStorageInfo", () => {
  it("should correctly parse a storage info buffer", () => {
    const buffer = new ArrayBuffer(62)
    const bytes = new DataView(buffer)

    bytes.setUint16(0, 1, true)
    bytes.setUint16(2, 2, true)
    bytes.setUint16(4, 3, true)
    bytes.setUint32(6, 12345, true)
    bytes.setUint32(10, 67890, true)
    bytes.setUint32(14, 54321, true)
    bytes.setUint32(18, 98765, true)
    bytes.setUint32(22, 100, true)

    let offset = 26

    offset = encodeToUtf16le(bytes, offset, "Storage1")
    offset = encodeToUtf16le(bytes, offset, "Volume1")

    const result = parseStorageInfo(buffer)

    const expected: StorageInfo = {
      storageType: StorageType.FixedROM,
      filesystemType: 2,
      accessCapability: 3,
      maxCapacity: 12345 + 2 ** 32 * 67890,
      freeSpaceInBytes: 54321 + 2 ** 32 * 98765,
      freeSpaceInObjects: 100,
      storageDescription: "Storage1",
      volumeLabel: "Volume1",
    }

    expect(result).toEqual(expected)
  })

  it("should throw an error if storageDescription length is invalid", () => {
    const buffer = new ArrayBuffer(28)
    const bytes = new DataView(buffer)

    bytes.setUint16(0, 1, true)
    bytes.setUint16(2, 2, true)
    bytes.setUint16(4, 3, true)
    bytes.setUint32(6, 12345, true)
    bytes.setUint32(10, 67890, true)
    bytes.setUint32(14, 54321, true)
    bytes.setUint32(18, 98765, true)
    bytes.setUint32(22, 100, true)

    bytes.setUint8(26, 10)
    bytes.setUint8(27, 0)

    expect(() => parseStorageInfo(buffer)).toThrowError(
      "Invalid typed array length: 20"
    )
  })

  it("should throw an error if volumeLabel length is invalid", () => {
    const buffer = new ArrayBuffer(47)
    const bytes = new DataView(buffer)

    bytes.setUint16(0, 1, true)
    bytes.setUint16(2, 2, true)
    bytes.setUint16(4, 3, true)
    bytes.setUint32(6, 12345, true)
    bytes.setUint32(10, 67890, true)
    bytes.setUint32(14, 54321, true)
    bytes.setUint32(18, 98765, true)
    bytes.setUint32(22, 100, true)

    let offset = 26
    offset = encodeToUtf16le(bytes, offset, "Storage1")

    bytes.setUint8(offset++, 5)
    bytes.setUint8(offset, 0)

    expect(() => parseStorageInfo(buffer)).toThrowError(
      "Invalid typed array length: 10"
    )
  })

  it("should correctly parse buffer with zero length storageDescription and volumeLabel", () => {
    const buffer = new ArrayBuffer(54)
    const bytes = new DataView(buffer)

    bytes.setUint16(0, 1, true)
    bytes.setUint16(2, 2, true)
    bytes.setUint16(4, 3, true)
    bytes.setUint32(6, 12345, true)
    bytes.setUint32(10, 67890, true)
    bytes.setUint32(14, 54321, true)
    bytes.setUint32(18, 98765, true)
    bytes.setUint32(22, 100, true)

    bytes.setUint8(26, 0)
    bytes.setUint8(27, 0)

    const result = parseStorageInfo(buffer)

    const expected: StorageInfo = {
      storageType: StorageType.FixedROM,
      filesystemType: 2,
      accessCapability: 3,
      maxCapacity: 12345 + 2 ** 32 * 67890,
      freeSpaceInBytes: 54321 + 2 ** 32 * 98765,
      freeSpaceInObjects: 100,
      storageDescription: "",
      volumeLabel: "",
    }

    expect(result).toEqual(expected)
  })
})
