/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { removeDecoratorsFromPhoneNumber } from "Renderer/models/utils/remove-decorators-from-phone-number"

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
