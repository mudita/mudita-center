/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Caller } from "Renderer/models/calls/calls.interface"
import { removeDecoratorsFromPhoneNumber } from "Renderer/models/utils/remove-decorators-from-phone-number"

export const isCallerMatchingPhoneNumber = (
  caller: Caller,
  phoneNumber: string
): boolean => {
  if (phoneNumber === "") {
    return false
  }

  return (
    removeDecoratorsFromPhoneNumber(caller.phoneNumber) ===
    removeDecoratorsFromPhoneNumber(phoneNumber)
  )
}
