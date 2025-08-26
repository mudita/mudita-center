/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export class CRC32Calculator {
  private static table = CRC32Calculator.makeTable()
  private crc = 0xffffffff

  static makeTable() {
    const table = new Uint32Array(256)
    for (let i = 0; i < 256; i++) {
      let c = i
      for (let j = 0; j < 8; j++) {
        c = (c >>> 1) ^ (0xedb88320 & -(c & 1))
      }
      table[i] = c >>> 0
    }
    return table
  }

  update(data: Buffer | Uint8Array | string) {
    if (typeof data === "string") {
      data = Buffer.from(data, "utf8")
    }
    for (let i = 0; i < data.length; i++) {
      this.crc =
        CRC32Calculator.table[(this.crc ^ data[i]) & 0xff] ^ (this.crc >>> 8)
    }
  }

  digest(): number {
    return ~this.crc >>> 0
  }
}
