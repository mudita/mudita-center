/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { convertTextEncoding } from "./convert-text-encoding"

export const encodeToUtf16leWithNullTerminator = (
  bytes: DataView,
  offset: number,
  string: string
): number => {
  const nullTerminator = "\0"
  const text = string + nullTerminator
  const encoded = convertTextEncoding(text, "utf-8", "utf16le")

  bytes.setUint8(offset++, text.length)

  encoded.forEach((byte) => {
    bytes.setUint8(offset++, byte)
  })

  return offset
}
