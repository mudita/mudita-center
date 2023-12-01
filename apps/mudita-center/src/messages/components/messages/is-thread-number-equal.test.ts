/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isThreadNumberEqual } from "App/messages/components/messages/is-thread-number-equal.helper"
import { Thread } from "App/messages/dto"

describe("`ishreadNumberEqual` helper", () => {
  const thread = {
    phoneNumber: "+48755853216",
  } as Thread

  test("returns true when thread number isn't formatted and target number too", () => {
    const targetPhoneNumber = "+48755853216"
    expect(isThreadNumberEqual(targetPhoneNumber)(thread)).toBeTruthy()
  })

  test("returns true  when thread number isn't formatted and target number is it", () => {
    const targetPhoneNumber = "+48 755 853 216"
    expect(isThreadNumberEqual(targetPhoneNumber)(thread)).toBeTruthy()
  })

  test("returns false when target number is empty string", () => {
    const targetPhoneNumber = ""
    expect(isThreadNumberEqual(targetPhoneNumber)(thread)).toBeFalsy()
  })

  test("returns false when target number hasn't dialling code", () => {
    const targetPhoneNumber = "755853216"
    expect(isThreadNumberEqual(targetPhoneNumber)(thread)).toBeFalsy()
  })
})
