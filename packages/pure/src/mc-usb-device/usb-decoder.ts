/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TextDecoder } from "util"
import { McUsbFileType } from "./mc-usb-file.interface"

export class UsbDecoder {
  static getParameters(buffer: ArrayBuffer): string[] {
    const bytes = new DataView(buffer)
    const length = buffer.byteLength
    const parameters = []

    for (let i = 0; i < length; i += Uint32Array.BYTES_PER_ELEMENT) {
      if (i <= length - Uint32Array.BYTES_PER_ELEMENT) {
        parameters.push(String(bytes.getUint32(i, true)))
      }
    }

    parameters.shift()

    return parameters
  }

  static getUsbFileType(buffer: ArrayBuffer): McUsbFileType {
    return UsbDecoder.getMcUsbFileType(UsbDecoder.getNumberFromUint16(buffer))
  }

  static getString(buffer: ArrayBuffer): string {
    const array = new Uint8Array(buffer)
    const decoder = new TextDecoder("utf-16le")
    return decoder.decode(array.subarray(1, array.byteLength - 2))
  }

  static getNumberFromUint64(buffer: ArrayBuffer): number {
    const dataview = new DataView(buffer)
    return UsbDecoder.getUint64(dataview)
  }

  static getNumberFromUint16(buffer: ArrayBuffer): number {
    const dataview = new DataView(buffer)
    return dataview.getUint16(0, true)
  }

  private static getUint64(
    dataview: DataView,
    byteOffset = 0,
    littleEndian = true
  ) {
    // split 64-bit number into two 32-bit (4-byte) parts
    const left = dataview.getUint32(byteOffset, littleEndian)
    const right = dataview.getUint32(byteOffset + 4, littleEndian)

    // combine the two 32-bit values
    const combined = littleEndian
      ? left + 2 ** 32 * right
      : 2 ** 32 * left + right

    if (!Number.isSafeInteger(combined)) {
      console.warn(combined, "exceeds MAX_SAFE_INTEGER. Precision may be lost")
    }

    return combined
  }

  private static getMcUsbFileType(value: number): McUsbFileType {
    const index = Object.values(McUsbFileType).indexOf(
      value as unknown as McUsbFileType
    )
    const key = Object.keys(McUsbFileType)[index]
    return key !== undefined ? value : McUsbFileType.unknown
  }
}
