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
    view[0] = parametrLenght
    view[1] = parametr1
    view[2] = parametr2

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
      view[0] = type

      test("`type` is decoded properly", () => {
        expect(UsbDecoder.getUsbFileType(buffer)).toEqual(type)
      })
    })

    describe("when type is unknown", () => {
      const type = 999
      const packetLength = Uint16Array.BYTES_PER_ELEMENT
      const buffer = new ArrayBuffer(packetLength)
      const view = new Uint16Array(buffer)
      view[0] = type

      test("unknown type is returned", () => {
        expect(UsbDecoder.getUsbFileType(buffer)).toEqual(McUsbFileType.unknown)
      })
    })
  })
})
