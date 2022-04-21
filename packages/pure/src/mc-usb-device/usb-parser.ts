/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UsbResponse, WriteOption } from "./usb-device.facade.class"

export class UsbParser {
  static buildContainerPacket(option: WriteOption): ArrayBuffer {
    const packetLength = 12 + option.payload.length * 4

    const buffer = new ArrayBuffer(packetLength)
    const bytes = new DataView(buffer)
    bytes.setUint32(0, packetLength, true)
    bytes.setUint16(4, option.type, true)
    bytes.setUint16(6, option.code, true)
    bytes.setUint32(8, option.id, true)

    option.payload.forEach((element, index) => {
      bytes.setUint32(12 + index * 4, element, true)
    })
    return buffer
  }

  static parseContainerPacket(buffer: ArrayBuffer): UsbResponse {
    const bytes = new DataView(buffer)

    return {
      type: bytes.getUint16(4, true),
      code: bytes.getUint16(6, true),
      id: bytes.getUint32(8, true),
      payload: bytes.buffer.slice(12),
    }
  }
}
