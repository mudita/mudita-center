/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { isContactMatchingPhoneNumber } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"

test("function returns true for the same primary number", () => {
  const result = isContactMatchingPhoneNumber(
    { primaryPhoneNumber: "123456" },
    "123456"
  )
  expect(result).toBeTruthy()
})

test("function returns true for the same secondary number", () => {
  const result = isContactMatchingPhoneNumber(
    { secondaryPhoneNumber: "123456" },
    "123456"
  )
  expect(result).toBeTruthy()
})

test("function returns true for the same primary and secondary numbers", () => {
  const result = isContactMatchingPhoneNumber(
    { primaryPhoneNumber: "123456", secondaryPhoneNumber: "123456" },
    "123456"
  )
  expect(result).toBeTruthy()
})

test("function returns false for different numbers", () => {
  const result = isContactMatchingPhoneNumber(
    { primaryPhoneNumber: "123456", secondaryPhoneNumber: "987654" },
    "456789"
  )
  expect(result).toBeFalsy()
})
