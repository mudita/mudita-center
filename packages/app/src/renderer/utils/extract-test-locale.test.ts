/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import extractLanguageKeys from "Renderer/utils/extract-test-locale"

const TEST_DATA = {
  "component.menu.headerDesktopApp": "Desktop App",
  "component.menu.headerYourPure": "Your Pure",
}

test("values are the same as keys", () => {
  expect(extractLanguageKeys(TEST_DATA)).toMatchObject({
    "component.menu.headerDesktopApp": "[value] component.menu.headerDesktopApp",
    "component.menu.headerYourPure": "[value] component.menu.headerYourPure",
  })
})

test("empty dictionaries should be handled properly", () => {
  const spy = jest.spyOn(global.console, "warn").mockImplementation()
  expect(extractLanguageKeys({})).toMatchObject({})
  expect(console.warn).toBeCalledWith("Translation dictionary is empty!")
  spy.mockRestore()
})
