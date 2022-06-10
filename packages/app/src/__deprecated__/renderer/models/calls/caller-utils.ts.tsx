/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { removeDecoratorsFromPhoneNumber } from "App/__deprecated__/renderer/models/utils/remove-decorators-from-phone-number"

export const isCallerMatchingPhoneNumber = (
  contactNumber: string,
  phoneNumber: string
): boolean => {
  if (phoneNumber === "") {
    return false
  }

  return (
    removeDecoratorsFromPhoneNumber(contactNumber) ===
    removeDecoratorsFromPhoneNumber(phoneNumber)
  )
}
