/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UsbDecoder } from "./usb-decoder"
import { McUsbFileType } from "./mc-usb-file.interface"

describe("`UsbDecoder`", () => {
  describe("`getParameters` method", () => {
    const parametrLenght = 2
    const parametr1 = 100
    const parametr2 = 101
    const packetLength = Uint32Array.BYTES_PER_ELEMENT * (parametrLenght + 1)
    const buffer = new ArrayBuffer(packetLength)
    const view = new Uint32Array(buffer)
    view.set([parametrLenght, parametr1, parametr2])

    test("`parameters` is decoded properly", () => {
      expect(UsbDecoder.getParameters(buffer)).toEqual([
        String(parametr1),
        String(parametr2),
      ])
    })
  })

  describe("`getUsbFileType` method", () => {
    describe("when type is defined", () => {
      const type = McUsbFileType.wav
      const packetLength = Uint16Array.BYTES_PER_ELEMENT
      const buffer = new ArrayBuffer(packetLength)
      const view = new Uint16Array(buffer)
      view.set([type])

      test("`type` is decoded properly", () => {
        expect(UsbDecoder.getUsbFileType(buffer)).toEqual(type)
      })
    })

    describe("when type is unknown", () => {
      const type = 999
      const packetLength = Uint16Array.BYTES_PER_ELEMENT
      const buffer = new ArrayBuffer(packetLength)
      const view = new Uint16Array(buffer)
      view.set([type])

      test("unknown type is returned", () => {
        expect(UsbDecoder.getUsbFileType(buffer)).toEqual(McUsbFileType.unknown)
      })
    })
  })

  describe("`getString` method", () => {
    const packetLength = 13
    const buffer = new ArrayBuffer(packetLength)
    const view = new Uint8Array(buffer)
    view.set([5, 72, 0, 101, 0, 108, 0, 108, 0, 111, 0, 200, 100])

    test("`string` is decoded properly", () => {
      expect(UsbDecoder.getString(buffer)).toEqual("Hello")
    })
  })

  describe("`getNumberFromUint16` method", () => {
    const packetLength = Uint16Array.BYTES_PER_ELEMENT
    const buffer = new ArrayBuffer(packetLength)
    const view = new Uint16Array(buffer)
    view.set([65535]) // 65535 (biggest 16-bit unsigned int)

    test("`number` is decoded properly", () => {
      expect(UsbDecoder.getNumberFromUint16(buffer)).toEqual(65535)
    })
  })

  describe("`getNumberFromUint64` method", () => {
    const packetLength = Uint32Array.BYTES_PER_ELEMENT * 2
    const buffer = new ArrayBuffer(packetLength)
    const view = new Uint32Array(buffer)
    view.set([1000, 90000]) // as Uint64Array

    test("`number` is decoded properly", () => {
      expect(UsbDecoder.getNumberFromUint64(buffer)).toEqual(386547056641000)
    })
  })
})
