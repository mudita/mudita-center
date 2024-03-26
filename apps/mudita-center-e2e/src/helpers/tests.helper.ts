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
}

export default new TestHelper()
