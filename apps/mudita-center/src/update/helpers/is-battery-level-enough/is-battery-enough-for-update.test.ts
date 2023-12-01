/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isBatteryLevelEnoughForUpdate } from "App/update/helpers/is-battery-level-enough/is-battery-enough-for-update.helper"

test.each([
  [0.1, false],
  [0.39, false],
  [0.4, true],
  [0.99, true],
])("for battery level %p it returns %p", (batteryLevel, expectedResult) => {
  expect(isBatteryLevelEnoughForUpdate(batteryLevel)).toEqual(expectedResult)
})

describe("when battery level is above 1", () => {
  test("the exception is raised", () => {
    expect(() =>
      isBatteryLevelEnoughForUpdate(1.01)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Battery level should not be higher than 1"`
    )
  })
})
