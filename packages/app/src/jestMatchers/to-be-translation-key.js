/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

const defaultTranslations = require("../renderer/locales/default/en-US.json")

module.exports = (received) => {
  if (received && typeof received.innerHTML === "string") {
    const properResult = received.innerHTML

    if (properResult.indexOf("[value]") === 0) {
      const key = properResult.replace("[value] ", "")

      if (key in defaultTranslations) {
        return {
          pass: true,
        }
      }

      return {
        pass: false,
        message: `No ${key} in default translations!`,
      }
    }

    return {
      pass: false,
      message: `Expected ${properResult}, got ${received}.`,
    }
  }

  return {
    pass: false,
    message: `Expected proper input.`,
  }
}
