/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const parseTextFromBuffer = (
  buffer: ArrayBuffer,
  offset: number
): string => {
  const bytes = new DataView(buffer)
  const length = bytes.getUint8(offset) * 2
  const textBytes = new Uint8Array(buffer, offset + 1, length)

  if (length === 0) {
    return ""
  }

  if (textBytes[length - 2] !== 0 || textBytes[length - 1] !== 0) {
    throw new Error("Missing null terminator at the end of the string")
  }

  const textWithoutNullTerminator = textBytes.slice(0, length - 2)
  return new TextDecoder("utf-16le").decode(textWithoutNullTerminator)
}
