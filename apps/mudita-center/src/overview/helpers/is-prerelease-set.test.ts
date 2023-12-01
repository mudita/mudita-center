/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import isPrereleaseSet from "App/overview/helpers/is-prerelease-set"

describe("isPrereleaseSet helper", () => {
  test("should return false when pre release isn't set", () => {
    expect(isPrereleaseSet("0.10.2")).toBeFalsy()
  })

  test("should return true when pre release is set", () => {
    expect(isPrereleaseSet("0.10.2-rc")).toBeTruthy()
  })

  test("should return true even when are sets more than one label in pre release", () => {
    expect(isPrereleaseSet("0.10.2-rc.1")).toBeTruthy()
  })
})
