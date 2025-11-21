/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  parseContainerPacket,
  ResponseContainerPacket,
} from "./parse-container-packet"

describe("parseContainerPacket", () => {
  it("should correctly parse a packet with mixed payload types", () => {
    const buffer = new ArrayBuffer(28)
    const bytes = new DataView(buffer)

    bytes.setUint32(0, 28, true)

    bytes.setUint16(4, 1, true)
    bytes.setUint16(6, 0x100c, true)
    bytes.setUint32(8, 1, true)

    bytes.setUint32(12, 12345, true)
    bytes.setUint16(16, 1000, true)

    const utf16leBuffer = new TextEncoder().encode("test.txt")
    bytes.setUint8(18, utf16leBuffer.length)
    utf16leBuffer.forEach((byte, i) => {
      bytes.setUint8(19 + i, byte)
    })
    bytes.setUint8(27, 0)

    const result = parseContainerPacket(buffer)

    const expected: ResponseContainerPacket = {
      type: 1,
      typeName: "Command",
      code: 0x100c,
      codeName: "Send Object Info",
      transactionId: 1,
      payload: buffer.slice(12),
    }

    expect(result).toEqual(expected)
  })
})
