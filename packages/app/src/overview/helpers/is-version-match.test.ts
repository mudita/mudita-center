/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import isVersionMatch from "App/overview/helpers/is-version-match"

test("function return true when semantic version is valid", () => {
  expect(isVersionMatch("0.10.2-rc")).toBeTruthy()
})

test("function return true when semantic version is valid", () => {
  expect(isVersionMatch("0.62.1")).toBeTruthy()
})
