/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import extractLanguageKeys from "App/__deprecated__/renderer/utils/extract-test-locale"

const TEST_DATA = {
  "component.menuHeaderDesktopApp": "Desktop App",
  "component.menuHeaderYourPure": "Your Pure",
}

test("values are the same as keys", () => {
  expect(extractLanguageKeys(TEST_DATA)).toMatchObject({
    "component.menuHeaderDesktopApp": "[value] component.menuHeaderDesktopApp",
    "component.menuHeaderYourPure": "[value] component.menuHeaderYourPure",
  })
})

test("empty dictionaries should be handled properly", () => {
  const spy = jest.spyOn(global.console, "warn").mockImplementation()
  expect(extractLanguageKeys({})).toMatchObject({})
  expect(console.warn).toBeCalledWith("Translation dictionary is empty!")
  spy.mockRestore()
})
