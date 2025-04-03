/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const getUint32s = (buffer: ArrayBuffer): number[] => {
  const view = new DataView(buffer)
  const values = []
  const count = buffer.byteLength / 4

  for (let i = 0; i < count; i++) {
    values.push(view.getUint32(i * 4, true))
  }

  return values
}
