/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isThreadPhoneNumberIdEqual } from "App/messages/components/messages/is-thread-number-equal.helper"
import { Thread } from "App/messages/dto"

describe("`ishreadNumberEqual` helper", () => {
  test("returns true when thread number is formatted and target number isn't", () => {
    const targetPhoneNumberId = "216"
    const thread = {
      phoneNumberId: "216",
    } as Thread
    expect(isThreadPhoneNumberIdEqual(targetPhoneNumberId)(thread)).toBeTruthy()
  })

  test("returns false when target number is empty string", () => {
    const targetPhoneNumberId = ""
    const thread = {
      phoneNumberId: "216",
    } as Thread
    expect(isThreadPhoneNumberIdEqual(targetPhoneNumberId)(thread)).toBeFalsy()
  })
})
