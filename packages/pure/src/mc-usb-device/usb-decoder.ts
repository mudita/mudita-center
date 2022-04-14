/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export class UsbDecoder {
  static getParameters(buffer: ArrayBuffer): string[] {
    const bytes = new DataView(buffer)
    const raw = new Uint8Array(buffer)
    const length = raw.byteLength
    const parameters = []

    for (let i = 0; i < length; i += 4) {
      if (i <= length - 4) {
        parameters.push(String(bytes.getUint32(i, true)))
      }
    }

    parameters.shift()

    return parameters
  }
}
