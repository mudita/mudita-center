/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getPrereleaseLabels from "App/overview/helpers/get-prerelease-labels"

describe("isPrereleaseSet helper", () => {
  test("should return empty list when version is pre release", () => {
    expect(getPrereleaseLabels("0.10.2")).toHaveLength(0)
  })

  test("should return properly pre release list of labels", () => {
    expect(getPrereleaseLabels("0.10.2-rc")[0]).toEqual("rc")
    expect(getPrereleaseLabels("0.10.2-rc")).toHaveLength(1)
  })

  test("should return properly pre release list of labels", () => {
    expect(getPrereleaseLabels("0.10.2-rc.1")[0]).toEqual("rc")
    expect(getPrereleaseLabels("0.10.2-rc.1")[1]).toEqual(1)
    expect(getPrereleaseLabels("0.10.2-rc.1")).toHaveLength(2)
  })
})
