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
      return true
    }
    return false
  }
  isOnline(): Promise<boolean> {
    return browser.execute(() => navigator.onLine) as Promise<boolean>
  }
}

export default new TestHelper()
