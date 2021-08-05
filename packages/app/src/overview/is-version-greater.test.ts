/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import isVersionGreater from "App/overview/is-version-greater"

const validSemanticVersion = "0.10.2-rc"
const notValidSemanticVersion = "0"

test("function return throw error when passed version are invalid", () => {
  expect(() =>
    isVersionGreater(validSemanticVersion, notValidSemanticVersion)
  ).toThrow()
  expect(() =>
    isVersionGreater(notValidSemanticVersion, validSemanticVersion)
  ).toThrow()
})

test("function validator works properly", () => {
  expect(() => isVersionGreater("1", validSemanticVersion)).toThrow()
  expect(() => isVersionGreater("1.0", validSemanticVersion)).toThrow()
  expect(() => isVersionGreater("01.0.0", validSemanticVersion)).toThrow()
  expect(() => isVersionGreater("1.01.0", validSemanticVersion)).toThrow()
  expect(() => isVersionGreater("1.0.01", validSemanticVersion)).toThrow()
  expect(() =>
    isVersionGreater("release-1.0.1", validSemanticVersion)
  ).toThrow()
})

test("the version comparison works correctly ", () => {
  expect(isVersionGreater("0.0.1", "0.0.0")).toBeTruthy()
  expect(isVersionGreater("0.1.0", "0.0.0")).toBeTruthy()
  expect(isVersionGreater("1.0.0", "0.0.0")).toBeTruthy()

  expect(isVersionGreater("0.10.2", "0.10.2")).toBeTruthy()
  expect(isVersionGreater("0.10.3", "0.10.2")).toBeTruthy()
  expect(isVersionGreater("0.10.1", "0.10.2")).toBeFalsy()

  expect(isVersionGreater("0.10.3-rc", "0.10.2-rc")).toBeTruthy()
  expect(isVersionGreater("0.10.1-rc", "0.10.2-rc")).toBeFalsy()
})
