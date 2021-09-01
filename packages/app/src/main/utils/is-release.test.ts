/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isRelease } from "App/main/utils/is-release"

test("isRelease utils works properly", () => {
  expect(isRelease("0.64.1")).toBe(true)
  expect(isRelease("1.0.0")).toBe(true)

  expect(isRelease("100.000.000")).toBe(false)
  expect(isRelease("0.64.1-internal")).toBe(false)
  expect(isRelease("0.64.1-rc1")).toBe(false)
  expect(isRelease("X.YY.Z")).toBe(false)
  expect(isRelease("1..0")).toBe(false)
  expect(isRelease("99.99.9-2021.08.25")).toBe(false)
})
