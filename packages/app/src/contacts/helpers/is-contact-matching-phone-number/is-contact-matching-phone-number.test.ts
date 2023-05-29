/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isContactMatchingPhoneNumberId } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"

test("function returns true for the same primary number", () => {
  const result = isContactMatchingPhoneNumberId(
    { primaryPhoneNumberId: "123456" },
    "123456"
  )
  expect(result).toBeTruthy()
})

test("function returns true for the same secondary number", () => {
  const result = isContactMatchingPhoneNumberId(
    { secondaryPhoneNumberId: "123456" },
    "123456"
  )
  expect(result).toBeTruthy()
})

test("function returns true for the same primary and secondary numbers", () => {
  const result = isContactMatchingPhoneNumberId(
    { primaryPhoneNumberId: "123456", secondaryPhoneNumberId: "123456" },
    "123456"
  )
  expect(result).toBeTruthy()
})

test("function returns false for different numbers", () => {
  const result = isContactMatchingPhoneNumberId(
    { primaryPhoneNumberId: "123456", secondaryPhoneNumberId: "987654" },
    "456789"
  )
  expect(result).toBeFalsy()
})
