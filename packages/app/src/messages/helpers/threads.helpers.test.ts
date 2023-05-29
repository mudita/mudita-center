/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isPhoneNumberValid } from "App/messages/helpers/threads.helpers"
import { Thread } from "App/messages/dto"
import { MessageType } from "App/messages/constants"

const firstThreadId = "1"
const secondThreadId = "2"

describe("is phone number valid", () => {
  test("valid", () => {
    expect(isPhoneNumberValid("123")).toBe(true)
    expect(isPhoneNumberValid("123456789")).toBe(true)
    expect(isPhoneNumberValid("+123456789")).toBe(true)
  })

  test("invalid", () => {
    expect(isPhoneNumberValid("ORANGE")).toBe(false)
    expect(isPhoneNumberValid("123 456 789")).toBe(false)
    expect(isPhoneNumberValid("+123 456 789")).toBe(false)
    expect(isPhoneNumberValid("123ABC")).toBe(false)
  })
})
