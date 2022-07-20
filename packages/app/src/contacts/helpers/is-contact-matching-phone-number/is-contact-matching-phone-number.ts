/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { removeDecoratorsFromPhoneNumber } from "App/__deprecated__/renderer/models/utils/remove-decorators-from-phone-number"
import { Props } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number.type"

export const isContactMatchingPhoneNumber = (
  { primaryPhoneNumber = "", secondaryPhoneNumber = "" }: Props,
  phoneNumber: string
): boolean => {
  if (phoneNumber === "") {
    return false
  }

  return (
    removeDecoratorsFromPhoneNumber(phoneNumber) ===
      removeDecoratorsFromPhoneNumber(primaryPhoneNumber) ||
    removeDecoratorsFromPhoneNumber(phoneNumber) ===
      removeDecoratorsFromPhoneNumber(secondaryPhoneNumber)
  )
}
