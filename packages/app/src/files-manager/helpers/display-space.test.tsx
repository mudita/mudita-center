/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { displaySpace } from "App/files-manager/helpers/display-space"

const smallValue = 124
const biggerValue = 14951
const oneKBInMebibytes = 0.000953675
const tenMBInMebibytes = 9.53674
const fourGBInMebibytes = 3814.7
const oneTBInMebibytes = 953675

describe("DisplaySpace", () => {
  test("returns correct format in MB for example value", () => {
    const result = displaySpace(smallValue)
    expect(result).toEqual("130 MB")
  })

  test("returns correct format in GB for example value", () => {
    const result = displaySpace(biggerValue)
    expect(result).toEqual("15.7 GB")
  })

  test("returns 0 B when 0 bytes provided", () => {
    expect(displaySpace(0)).toBe("0 B")
  })

  test("returns correct format in bytes", () => {
    expect(displaySpace(0.00001)).toBe("10.48576 B")
  })

  test("returns correct format in KB", () => {
    expect(displaySpace(oneKBInMebibytes)).toBe("1 KB")
  })

  test("returns correct format in MB", () => {
    expect(displaySpace(tenMBInMebibytes)).toBe("10 MB")
  })

  test("returns correct format in GB", () => {
    expect(displaySpace(fourGBInMebibytes)).toBe("4 GB")
  })

  test("returns correct format in TB", () => {
    expect(displaySpace(oneTBInMebibytes)).toBe("1 TB")
  })
})
