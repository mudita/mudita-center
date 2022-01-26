/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { convertFromBytesToDecimal } from "Renderer/utils/convert-from-bytes-to-decimal/convert-from-bytes-to-decimal"

const smallValue = 124 * 1048576
const biggerValue = 14951 * 1048576
const oneKBInBytes = 1000
const oneMBInBytes = 1000000
const fourGBInBytes = 4000000000
const oneTBInBytes = 1000000000000

describe("convertFromMebibytes", () => {
  test("returns correct format in MB for example value", () => {
    const result = convertFromBytesToDecimal(smallValue)
    expect(result).toEqual("130 MB")
  })

  test("returns correct format in GB for example value", () => {
    const result = convertFromBytesToDecimal(biggerValue)
    expect(result).toEqual("15.7 GB")
  })

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
