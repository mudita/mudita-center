/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { convertBytes } from "Renderer/utils/convert-bytes"
const oneKbInBytes = 1024
const tenMbInBytes = 10485760
const fourGbInBytes = 4294967296
const oneTbInBytes = 1099511627776

test("returns 0 B when 0 bytes provided", () => {
  expect(convertBytes(0)).toBe("0 B")
})

test("returns correct format in bytes", () => {
  expect(convertBytes(1000)).toBe("1000 B")
})

test("returns correct format in B", () => {
  expect(convertBytes(1)).toBe("1 B")
})

test("returns correct format in KB", () => {
  expect(convertBytes(oneKbInBytes)).toBe("1.0 KB")
})

test("returns correct format in MB", () => {
  expect(convertBytes(tenMbInBytes)).toBe("10.0 MB")
})

test("returns correct format in GB", () => {
  expect(convertBytes(fourGbInBytes)).toBe("4.0 GB")
})

test("returns correct format in TB", () => {
  expect(convertBytes(oneTbInBytes)).toBe("1.0 TB")
})

test("returns correct format when not forcing fraction digits", () => {
  expect(convertBytes(oneKbInBytes, { fixedFractionDigits: false })).toBe(
    "1 KB"
  )
  expect(
    convertBytes(oneKbInBytes + 100, {
      fixedFractionDigits: false,
      precision: 2,
    })
  ).toBe("1.1 KB")
  expect(
    convertBytes(oneKbInBytes + 151, {
      fixedFractionDigits: false,
      precision: 2,
    })
  ).toBe("1.15 KB")
  expect(
    convertBytes(oneKbInBytes + 151, {
      fixedFractionDigits: false,
      precision: 3,
    })
  ).toBe("1.147 KB")
  expect(
    convertBytes(oneKbInBytes + 256, {
      fixedFractionDigits: false,
      precision: 3,
    })
  ).toBe("1.25 KB")
})
