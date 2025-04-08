/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { parseObjectInfo } from "./parse-object-info"
import { encodeToUtf16le } from "./encode-to-utf16le"

describe("parseObjectInfo", () => {
  it("should correctly parse an ObjectInfo dataset", () => {
    const buffer = new ArrayBuffer(164)
    const bytes = new DataView(buffer)

    bytes.setUint32(0, 12345, true)
    bytes.setUint16(4, 2, true)
    bytes.setUint16(6, 1, true)
    bytes.setUint32(8, 5000, true)
    bytes.setUint16(12, 1, true)
    bytes.setUint32(14, 1000, true)
    bytes.setUint32(18, 80, true)
    bytes.setUint32(22, 80, true)
    bytes.setUint32(26, 1920, true)
    bytes.setUint32(30, 1080, true)
    bytes.setUint32(34, 24, true)
    bytes.setUint32(38, 123, true)
    bytes.setUint16(42, 0, true)
    bytes.setUint32(44, 0, true)
    bytes.setUint32(48, 1, true)

    let offset = 52
    offset = encodeToUtf16le(bytes, offset, "testfile.txt")
    offset = encodeToUtf16le(bytes, offset, "2025-04-07")
    offset = encodeToUtf16le(bytes, offset, "2025-04-07")
    offset = encodeToUtf16le(bytes, offset, "keyword1, keyword2")

    const result = parseObjectInfo(buffer)

    const expected = {
      storageID: 12345,
      objectFormat: 2,
      protectionStatus: 1,
      objectCompressedSize: 5000,
      thumbFormat: 1,
      thumbCompressedSize: 1000,
      thumbPixWidth: 80,
      thumbPixHeight: 80,
      imagePixWidth: 1920,
      imagePixHeight: 1080,
      imageBitDepth: 24,
      parentObject: 123,
      associationType: 0,
      associationDesc: 0,
      sequenceNumber: 1,
      filename: "testfile.txt",
      dateCreated: "2025-04-07",
      dateModified: "2025-04-07",
      keywords: "keyword1, keyword2",
    }

    expect(result).toEqual(expected)
  })

  it("should throw an error if the buffer is invalid", () => {
    const buffer = new ArrayBuffer(10)

    expect(() => parseObjectInfo(buffer)).toThrowError(
      "Offset is outside the bounds of the DataView"
    )
  })
})
