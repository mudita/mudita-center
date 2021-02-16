/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import extractLanguageKeys from "Renderer/utils/extract-test-locale"

const TEST_DATA = {
  "menu.header.desktopApp": "Desktop App",
  "menu.header.yourPure": "Your Pure",
}

test("values are the same as keys", () => {
  expect(extractLanguageKeys(TEST_DATA)).toMatchObject({
    "menu.header.desktopApp": "[value] menu.header.desktopApp",
    "menu.header.yourPure": "[value] menu.header.yourPure",
  })
})

test("empty dictionaries should be handled properly", () => {
  const spy = jest.spyOn(global.console, "warn").mockImplementation()
  expect(extractLanguageKeys({})).toMatchObject({})
  expect(console.warn).toBeCalledWith("Translation dictionary is empty!")
  spy.mockRestore()
})
