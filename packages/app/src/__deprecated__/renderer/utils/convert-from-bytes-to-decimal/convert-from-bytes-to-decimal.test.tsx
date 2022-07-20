/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { convertFromBytesToDecimal } from "App/__deprecated__/renderer/utils/convert-from-bytes-to-decimal/convert-from-bytes-to-decimal"

const oneKBInBytes = 1000
const oneMBInBytes = 1000000
const fourGBInBytes = 4000000000
const oneTBInBytes = 1000000000000

describe("convertFromMebibytes", () => {
  test("returns 0 B when 0 bytes provided", () => {
    expect(convertFromBytesToDecimal(0)).toBe("0 B")
  })

  test("returns correct format in bytes", () => {
    expect(convertFromBytesToDecimal(100)).toBe("100 B")
  })

  test("returns correct format in KB", () => {
    expect(convertFromBytesToDecimal(oneKBInBytes)).toBe("1 KB")
  })

  test("returns correct format in MB", () => {
    expect(convertFromBytesToDecimal(oneMBInBytes)).toBe("1 MB")
  })

  test("returns correct format in GB", () => {
    expect(convertFromBytesToDecimal(fourGBInBytes)).toBe("4 GB")
  })

  test("returns correct format in TB", () => {
    expect(convertFromBytesToDecimal(oneTBInBytes)).toBe("1 TB")
  })
})
