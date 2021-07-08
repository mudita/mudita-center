/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import isOsVersionSupported from "Renderer/modules/overview/is-os-version-supported";

const validSemanticVersion = "0.10.2-rc"
const notValidSemanticVersion = "0"

test("function return throw error when passed version are invalid", () => {
  expect(() => isOsVersionSupported(validSemanticVersion, notValidSemanticVersion)).toThrow()
  expect(() => isOsVersionSupported(notValidSemanticVersion, validSemanticVersion)).toThrow()
})

test("function validator works properly", () => {
  expect(() => isOsVersionSupported("1", validSemanticVersion)).toThrow()
  expect(() => isOsVersionSupported("1.0", validSemanticVersion)).toThrow()
  expect(() => isOsVersionSupported("01.0.0", validSemanticVersion)).toThrow()
  expect(() => isOsVersionSupported("1.01.0", validSemanticVersion)).toThrow()
  expect(() => isOsVersionSupported("1.0.01", validSemanticVersion)).toThrow()
  expect(() => isOsVersionSupported("release-1.0.1", validSemanticVersion)).toThrow()
})

test("the version comparison works correctly ", () => {
  expect(isOsVersionSupported("0.0.1", "0.0.0")).toBeTruthy()
  expect(isOsVersionSupported("0.1.0", "0.0.0")).toBeTruthy()
  expect(isOsVersionSupported("1.0.0", "0.0.0")).toBeTruthy()

  expect(isOsVersionSupported("0.10.2", "0.10.2")).toBeTruthy()
  expect(isOsVersionSupported("0.10.3", "0.10.2")).toBeTruthy()
  expect(isOsVersionSupported("0.10.1", "0.10.2")).toBeFalsy()

  expect(isOsVersionSupported("0.10.3-rc", "0.10.2-rc")).toBeTruthy()
  expect(isOsVersionSupported("0.10.1-rc", "0.10.2-rc")).toBeFalsy()
})
