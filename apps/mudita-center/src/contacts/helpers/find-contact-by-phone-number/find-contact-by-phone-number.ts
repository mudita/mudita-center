/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/reducers/contacts.interface"
import { isContactMatchingPhoneNumber } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"

const findContactByPhoneNumber = (
  contacts: Contact[],
  phoneNumber: string
): Contact | undefined => {
  return contacts.find((contact) =>
    isContactMatchingPhoneNumber(contact, phoneNumber)
  )
}

export default findContactByPhoneNumber
