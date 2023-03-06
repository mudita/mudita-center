/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import isVersionGreaterOrEqual from "App/overview/helpers/is-version-greater-or-equal"

const validSemanticVersion = "0.10.2-rc"
const notValidSemanticVersion = "0"

test("function return throw error when passed version are invalid", () => {
  expect(() =>
    isVersionGreaterOrEqual(validSemanticVersion, notValidSemanticVersion)
  ).toThrow()
  expect(() =>
    isVersionGreaterOrEqual(notValidSemanticVersion, validSemanticVersion)
  ).toThrow()
})

test("function validator works properly", () => {
  expect(() => isVersionGreaterOrEqual("1", validSemanticVersion)).toThrow()
  expect(() => isVersionGreaterOrEqual("1.0", validSemanticVersion)).toThrow()
  expect(() =>
    isVersionGreaterOrEqual("01.0.0", validSemanticVersion)
  ).toThrow()
  expect(() =>
    isVersionGreaterOrEqual("1.01.0", validSemanticVersion)
  ).toThrow()
  expect(() =>
    isVersionGreaterOrEqual("1.0.01", validSemanticVersion)
  ).toThrow()
  expect(() =>
    isVersionGreaterOrEqual("release-1.0.1", validSemanticVersion)
  ).toThrow()
})

test("the version comparison works correctly ", () => {
  expect(isVersionGreaterOrEqual("0.0.1", "0.0.0")).toBeTruthy()
  expect(isVersionGreaterOrEqual("0.1.0", "0.0.0")).toBeTruthy()
  expect(isVersionGreaterOrEqual("1.0.0", "0.0.0")).toBeTruthy()

  expect(isVersionGreaterOrEqual("0.10.2", "0.10.2")).toBeTruthy()
  expect(isVersionGreaterOrEqual("0.10.3", "0.10.2")).toBeTruthy()
  expect(isVersionGreaterOrEqual("0.10.1", "0.10.2")).toBeFalsy()

  expect(isVersionGreaterOrEqual("0.10.3-rc", "0.10.2-rc")).toBeTruthy()
  expect(isVersionGreaterOrEqual("0.10.1-rc", "0.10.2-rc")).toBeFalsy()
})
