/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatPhoneNumber } from "App/contacts/helpers/format-phone-number/format-phone-number"

describe("formatPhoneNumber helper", () => {
  test("should return formatted number with area code", () => {
    const number = "+48123456789"
    const result = formatPhoneNumber(number)
    expect(result).toBe("+48 123 456 789")
  })

  test("should return formatted number", () => {
    const number = "123456789"
    const result = formatPhoneNumber(number)
    expect(result).toBe("123 456 789")
  })
})
