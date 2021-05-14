/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isPrerelease } from "App/main/utils/is-prerelease"

test("isPrerelease utils works properly", () => {
  expect(isPrerelease("release-0.64.1")).toBe(false)
  expect(isPrerelease("release-1.0.0")).toBe(false)
  expect(isPrerelease("release-100.000.000")).toBe(false)

  expect(isPrerelease("release-0.64.1-internal")).toBe(true)
  expect(isPrerelease("release-0.64.1-rc1")).toBe(true)
  expect(isPrerelease("0.64.1")).toBe(true)
  expect(isPrerelease("release-X.YY.Z")).toBe(true)
})
