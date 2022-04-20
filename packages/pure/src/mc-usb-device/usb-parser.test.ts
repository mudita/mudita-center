/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TextDecoder } from "util"
import { UsbParser } from "./usb-parser"
import { WriteOption } from "./usb-device.facade.class"

describe("`UsbParser`", () => {
  describe("`buildContainerPacket` method", () => {
    const option: WriteOption = {
      type: 2,
      code: 0x1007,
      id: 1,
      payload: [0xffffffff, 0, 0xffffffff],
    }

    test("returns correctly `byteLength`", () => {
      const buffer = UsbParser.buildContainerPacket(option)
      expect(buffer.byteLength).toBe(24)
    })

    test("`byteLength` is set on the beginning of the packet", () => {
      const buffer = UsbParser.buildContainerPacket(option)
      const bytes = new DataView(buffer)
      const byteLength = bytes.getUint32(0, true)
      expect(byteLength).toBe(buffer.byteLength)
    })

    test("`type` is set on properly offset", () => {
      const buffer = UsbParser.buildContainerPacket(option)
      const bytes = new DataView(buffer)
      const type = bytes.getUint16(4, true)
      expect(type).toBe(option.type)
    })

    test("`code` is set on properly offset", () => {
      const buffer = UsbParser.buildContainerPacket(option)
      const bytes = new DataView(buffer)
      const code = bytes.getUint16(6, true)
      expect(code).toBe(option.code)
    })

    test("`payload` is set on properly offset", () => {
      const buffer = UsbParser.buildContainerPacket(option)
      const bytes = new DataView(buffer)
      const payload0 = bytes.getUint32(12, true)
      expect(payload0).toBe(option.payload[0])

      const payload1 = bytes.getUint32(12 + Uint32Array.BYTES_PER_ELEMENT, true)
      expect(payload1).toBe(option.payload[1])
    })
  })

  describe("`parseContainerPacket` method", () => {
    const constPacketLength = 17
    const type = 12
    const code = 1
    const id = 1
    const buffer = new ArrayBuffer(constPacketLength)
    const bytes = new DataView(buffer)
    bytes.setUint32(0, constPacketLength, true)
    bytes.setUint16(4, type, true)
    bytes.setUint16(6, code, true)
    bytes.setUint32(8, id, true)
    bytes.setUint8(12, 72)
    bytes.setUint8(13, 101)
    bytes.setUint8(14, 108)
    bytes.setUint8(15, 108)
    bytes.setUint8(16, 111)

    test("`type` is parsed properly", () => {
      const response = UsbParser.parseContainerPacket(buffer)
      expect(response.type).toBe(type)
    })

    test("`code` is parsed properly", () => {
      const response = UsbParser.parseContainerPacket(buffer)
      expect(response.code).toBe(code)
    })

    test("`id` is parsed properly", () => {
      const response = UsbParser.parseContainerPacket(buffer)
      expect(response.id).toBe(id)
    })

    test("`payload` is parsed properly", () => {
      const response = UsbParser.parseContainerPacket(buffer)
      const uint8Array = new Uint8Array(response.payload)
      expect(new TextDecoder().decode(uint8Array)).toBe("Hello")
    })
  })
})
