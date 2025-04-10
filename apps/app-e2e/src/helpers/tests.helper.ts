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
    return process.platform === "linux"
  }
  isWindows() {
    return process.platform === "win32"
  }
  isMac() {
    return process.platform === "darwin"
  }
  insertTextToElement = async (element: WebdriverIO.Element, text: string) => {
    await element.waitForClickable()
    await element.click()
    await element.setValue(text)
  }
  switchToOffline = async () => {
    console.log("Switching to offline mode")
    await browser.setNetworkConditions({
      offline: true,
      latency: 0,
      download_throughput: 0,
      upload_throughput: 0,
    })
  }
  switchToOnline = async () => {
    console.log("Switching to online mode")
    await browser.setNetworkConditions({
      offline: false,
      latency: 0,
      download_throughput: -1,
      upload_throughput: -1,
    })
  }
  isOnline() {
    return browser.execute(() => navigator.onLine)
  }
}

export default new TestHelper()
