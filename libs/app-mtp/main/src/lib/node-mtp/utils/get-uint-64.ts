/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export function getUint64(
  dataview: DataView,
  byteOffset: number,
  littleEndian = true
): number {
  const left = dataview.getUint32(byteOffset, littleEndian)
  const right = dataview.getUint32(byteOffset + 4, littleEndian)
  return littleEndian ? left + 2 ** 32 * right : 2 ** 32 * left + right
}
