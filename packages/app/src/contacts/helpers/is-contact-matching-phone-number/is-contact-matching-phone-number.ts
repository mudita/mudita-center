/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Props } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number.type"

export const isContactMatchingPhoneNumberId = (
  { primaryPhoneNumberId = "", secondaryPhoneNumberId = "" }: Props,
  phoneNumberId: string
): boolean => {
  if (phoneNumberId === "") {
    return false
  }

  console.log(
    "isContactMatchingPhoneNumberId primaryPhoneNumberId",
    primaryPhoneNumberId,
    "secondaryPhoneNumberId",
    secondaryPhoneNumberId
  )
  return [primaryPhoneNumberId, secondaryPhoneNumberId].includes(phoneNumberId)
}
