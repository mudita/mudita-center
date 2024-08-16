/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Checks if current operating system is Linux
 * @returns boolean
 */
class TestHelper {
  isLinux() {
    if (process.platform === "linux") {
      console.log("CURRENT PLATFORM: " + process.platform)
      console.log(process.platform + " = Test Skipped ")
      return true
    }
    return false
  }
  isOnline() {
    return browser.execute(() => navigator.onLine)
  }
  insertTextToElement = async (element: WebdriverIO.Element, text: string) => {
    await element.waitForClickable()
    await element.click()
    await element.setValue(text)
  }
}

export default new TestHelper()
