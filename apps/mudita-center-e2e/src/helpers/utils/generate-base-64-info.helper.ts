/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import crc32 from "crc-32"

export function generateBase64Info(obj: Record<string, unknown>) {
  const jsonString = JSON.stringify(obj)
  const data = Buffer.from(jsonString, "utf8").toString()
  const base64String = Buffer.from(data).toString("base64")
  const sizeInBytes = Buffer.byteLength(data, "utf8")
  const crc32Hex = (crc32.buf(Buffer.from(base64String, "utf8")) >>> 0)
    .toString(16)
    .padStart(8, "0")

  return {
    base64: base64String,
    sizeInBytes: sizeInBytes,
    crc32Hex: crc32Hex,
  }
}
