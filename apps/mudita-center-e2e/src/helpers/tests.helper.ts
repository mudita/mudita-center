/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Checks if current operating system is Linux
 * @returns boolean
 */
class TestHelper {
  isNotLinux() {
    if (process.platform === "linux") {
      console.log("CURRENT PLATFORM: " + process.platform)
      console.log(process.platform + " = Test Skipped ")
      return false
    }
    return true
  }
}

export default new TestHelper()
