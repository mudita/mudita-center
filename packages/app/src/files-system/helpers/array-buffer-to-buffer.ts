/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Uint8Array is a general-purpose byte-array that’s available in both nodejs and browsers.
 * Buffer is a subclass of Uint8Array that’s only available in nodejs
 */

export const arrayBufferToBuffer = (ab: Uint8Array): Buffer => {
  const buffer = Buffer.alloc(ab.byteLength)
  const view = new Uint8Array(ab)
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i]
  }
  return buffer
}
