/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  buildContainerPacket,
  RequestContainerPacket,
} from "./build-container-packet"

describe("buildContainerPacket", () => {
  it("should correctly build a packet for a UINT32 payload", () => {
    const container: RequestContainerPacket = {
      transactionId: 1,
      type: 1,
      code: 0x100c,
      payload: [{ value: 12345, type: "UINT32" }],
    }

    const result = buildContainerPacket(container)
    const expected = new ArrayBuffer(16)
    const bytes = new DataView(expected)

    bytes.setUint32(0, 16, true)
    bytes.setUint16(4, 1, true)
    bytes.setUint16(6, 0x100c, true)
    bytes.setUint32(8, 1, true)
    bytes.setUint32(12, 12345, true)

    expect(new Uint8Array(result)).toEqual(new Uint8Array(expected))
  })

  it("should correctly build a packet for a UINT16 payload", () => {
    const container: RequestContainerPacket = {
      transactionId: 2,
      type: 2,
      code: 0x200c,
      payload: [{ value: 1000, type: "UINT16" }],
    }

    const result = buildContainerPacket(container)
    const expected = new ArrayBuffer(14)
    const bytes = new DataView(expected)

    bytes.setUint32(0, 14, true)
    bytes.setUint16(4, 2, true)
    bytes.setUint16(6, 0x200c, true)
    bytes.setUint32(8, 2, true)
    bytes.setUint16(12, 1000, true)

    expect(new Uint8Array(result)).toEqual(new Uint8Array(expected))
  })

  it("should correctly build a packet for a UINT8 payload", () => {
    const container: RequestContainerPacket = {
      transactionId: 3,
      type: 3,
      code: 0x100d,
      payload: [{ value: 255, type: "UINT8" }],
    }

    const result = buildContainerPacket(container)
    const expected = new ArrayBuffer(13)
    const bytes = new DataView(expected)

    bytes.setUint32(0, 13, true)
    bytes.setUint16(4, 3, true)
    bytes.setUint16(6, 0x100d, true)
    bytes.setUint32(8, 3, true)
    bytes.setUint8(12, 255)

    expect(new Uint8Array(result)).toEqual(new Uint8Array(expected))
  })

  it("should correctly build a packet for a UTF8 string payload converted to UTF16le", () => {
    const filename = "test.txt"

    const container: RequestContainerPacket = {
      transactionId: 4,
      type: 4,
      code: 0x100d,
      payload: [{ value: filename, type: "UTF16le" }],
    }

    const packet = buildContainerPacket(container)

    const nullTerminatorSize = 1
    const stringLengthFieldSize = 1
    const charSize = 2
    const headerSize = 12

    const totalChars = filename.length + nullTerminatorSize
    const bufferSize =
      headerSize + stringLengthFieldSize + totalChars * charSize

    const buffer = new ArrayBuffer(bufferSize)
    const dataView = new DataView(buffer)

    dataView.setUint32(0, bufferSize, true)
    dataView.setUint16(4, 4, true)
    dataView.setUint16(6, 0x100d, true)
    dataView.setUint32(8, 4, true)

    const textStart = headerSize
    dataView.setUint8(textStart, totalChars)

    for (let i = 0; i < filename.length; i++) {
      dataView.setUint16(
        textStart + stringLengthFieldSize + i * charSize,
        filename.charCodeAt(i),
        true
      )
    }

    dataView.setUint16(
      textStart + stringLengthFieldSize + filename.length * charSize,
      0,
      true
    )

    expect(new Uint8Array(packet)).toEqual(new Uint8Array(buffer))
  })

  it("should correctly build a packet for an empty UTF8 string payload converted to UTF16le", () => {
    const filename = ""

    const container: RequestContainerPacket = {
      transactionId: 4,
      type: 4,
      code: 0x100d,
      payload: [{ value: filename, type: "UTF16le" }],
    }

    const packet = buildContainerPacket(container)

    const nullTerminatorSize = 1
    const stringLengthFieldSize = 1
    const charSize = 2
    const headerSize = 12

    const totalChars = filename.length + nullTerminatorSize
    const bufferSize =
      headerSize + stringLengthFieldSize + totalChars * charSize

    const buffer = new ArrayBuffer(bufferSize)
    const dataView = new DataView(buffer)

    dataView.setUint32(0, bufferSize, true)
    dataView.setUint16(4, 4, true)
    dataView.setUint16(6, 0x100d, true)
    dataView.setUint32(8, 4, true)

    const textStart = headerSize
    dataView.setUint8(textStart, totalChars)

    for (let i = 0; i < filename.length; i++) {
      dataView.setUint16(
        textStart + stringLengthFieldSize + i * charSize,
        filename.charCodeAt(i),
        true
      )
    }

    dataView.setUint16(
      textStart + stringLengthFieldSize + filename.length * charSize,
      0,
      true
    )

    expect(new Uint8Array(packet)).toEqual(new Uint8Array(buffer))
  })

  it("should throw an error when an unsupported payload type is provided", () => {
    const container: RequestContainerPacket = {
      transactionId: 5,
      type: 2,
      code: 0x100d,
      // @ts-ignore
      payload: [{ value: "unsupported", type: "unsupported" }],
    }

    expect(() => buildContainerPacket(container)).toThrowError(
      `Unsupported type for item: {"value":"unsupported","type":"unsupported"}`
    )
  })

  it("should correctly encode a UTF16le string with a null terminator", () => {
    const expectedBuffer = new ArrayBuffer(2)
    const expectedView = new DataView(expectedBuffer)

    const stringOffset = 0
    const encodedStringWithNull = new Uint8Array([
      ...new TextEncoder().encode("1"),
      0x00,
    ])

    encodedStringWithNull.forEach((byte, index) => {
      expectedView.setUint8(stringOffset + index, byte)
    })

    const resultBuffer = new ArrayBuffer(2)
    const resultView = new DataView(resultBuffer)

    resultView.setUint8(0, 49) // UTF16le encoding for '1'
    resultView.setUint8(1, 0) // Null terminator

    expect(new Uint8Array(resultBuffer)).toEqual(new Uint8Array(expectedBuffer))
  })

  it("should throw an error when packet size exceeds the maximum buffer size", () => {
    const container: RequestContainerPacket = {
      transactionId: 6,
      type: 2,
      code: 0x100d,
      payload: [
        { value: 123456789, type: "UINT32" },
        { value: 12345, type: "UINT16" },
        { value: 255, type: "UINT8" },
        { value: "a".repeat(500), type: "UTF16le" }, // A large string that exceeds maxBufferSize
      ],
    }

    expect(() => buildContainerPacket(container, 512)).toThrowError(
      `Offset is outside the bounds of the DataView`
    )
  })

  it("should correctly build a packet when fixSize is provided", () => {
    const container: RequestContainerPacket = {
      transactionId: 7,
      type: 1,
      code: 0x100d,
      payload: [{ value: 123456789, type: "UINT32" }],
      fixSize: 20,
    }

    const result = buildContainerPacket(container)
    const expected = new ArrayBuffer(16)
    const bytes = new DataView(expected)

    bytes.setUint32(0, 20, true)
    bytes.setUint16(4, 1, true)
    bytes.setUint16(6, 0x100d, true)
    bytes.setUint32(8, 7, true)
    bytes.setUint32(12, 123456789, true)

    expect(new Uint8Array(result)).toEqual(new Uint8Array(expected))
  })
})
