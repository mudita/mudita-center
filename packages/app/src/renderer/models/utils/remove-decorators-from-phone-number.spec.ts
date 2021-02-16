/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { removeDecoratorsFromPhoneNumber } from "Renderer/models/utils/remove-decorators-from-phone-number"

const rawPhoneNumber = "33999999999"

test("phoneNumber with spaces is equal to 'raw' phoneNumber", () => {
  expect(removeDecoratorsFromPhoneNumber("33 999 999 999")).toEqual(
    rawPhoneNumber
  )
})

test("phoneNumber with multiple spaces is equal to 'raw' phoneNumber", () => {
  expect(
    removeDecoratorsFromPhoneNumber("   33    999     999    9 99   ")
  ).toEqual(rawPhoneNumber)
})

test("phoneNumber with '+' and spaces is equal to 'raw' phoneNumber", () => {
  expect(removeDecoratorsFromPhoneNumber("+33 999 999 999")).toEqual(
    rawPhoneNumber
  )
})
