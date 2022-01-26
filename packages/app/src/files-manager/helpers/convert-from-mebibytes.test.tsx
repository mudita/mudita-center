/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { convertFromMebibytes } from "App/files-manager/helpers/convert-from-mebibytes"

const smallValue = 124
const biggerValue = 14951
const oneKBInMebibytes = 0.000953675
const tenMBInMebibytes = 9.53674
const fourGBInMebibytes = 3814.7
const oneTBInMebibytes = 953675

describe("convertFromMebibytes", () => {
  test("returns correct format in MB for example value", () => {
    const result = convertFromMebibytes(smallValue)
    expect(result).toEqual("130 MB")
  })

  test("returns correct format in GB for example value", () => {
    const result = convertFromMebibytes(biggerValue)
    expect(result).toEqual("15.7 GB")
  })

  test("returns 0 B when 0 bytes provided", () => {
    expect(convertFromMebibytes(0)).toBe("0 B")
  })

  test("returns correct format in bytes", () => {
    expect(convertFromMebibytes(0.00001)).toBe("10.48576 B")
  })

  test("returns correct format in KB", () => {
    expect(convertFromMebibytes(oneKBInMebibytes)).toBe("1 KB")
  })

  test("returns correct format in MB", () => {
    expect(convertFromMebibytes(tenMBInMebibytes)).toBe("10 MB")
  })

  test("returns correct format in GB", () => {
    expect(convertFromMebibytes(fourGBInMebibytes)).toBe("4 GB")
  })

  test("returns correct format in TB", () => {
    expect(convertFromMebibytes(oneTBInMebibytes)).toBe("1 TB")
  })
})
