/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UsbDecoder } from "./usb-decoder"

describe("`UsbDecoder`", () => {
  describe("getParameters", () => {
    const parametrLenght = 2
    const parametr1 = 100
    const parametr2 = 101
    const packetLength = Uint32Array.BYTES_PER_ELEMENT * (parametrLenght + 1)
    const buffer = new ArrayBuffer(packetLength)
    const view = new Uint32Array(buffer)
    view[0] = parametrLenght
    view[1] = parametr1
    view[2] = parametr2

    test("returns parameters properly", () => {
      expect(UsbDecoder.getParameters(buffer)).toEqual([
        String(parametr1),
        String(parametr2),
      ])
    })
  })
})
