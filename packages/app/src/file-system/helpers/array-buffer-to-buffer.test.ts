/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { arrayBufferToBuffer } from "App/file-system/helpers/array-buffer-to-buffer"

describe("`arrayBufferToBuffer` function", () => {
  const data = [1, 2, 3, 4, 5]

  test("Uint8Array constructor isn't equal to buffer", () => {
    const bufferView = new Uint8Array(data)
    expect(bufferView.constructor).not.toBe(Buffer)
    expect(bufferView.constructor).toBe(Uint8Array)
  })

  test("mapped buffer return buffer as constructor", () => {
    const buffer = arrayBufferToBuffer(new Uint8Array(data))
    expect(buffer.constructor).not.toBe(Uint8Array)
    expect(buffer.constructor).toBe(Buffer)
  })
})
