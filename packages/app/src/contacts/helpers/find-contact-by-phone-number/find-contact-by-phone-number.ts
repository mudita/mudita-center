/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/reducers/contacts.interface"
import { isContactMatchingPhoneNumberId } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"

const findContactByPhoneNumber = (
  contacts: Contact[],
  phoneNumberId: string
): Contact | undefined => {
  return contacts.find((contact) =>
    isContactMatchingPhoneNumberId(contact, phoneNumberId)
  )
}

export default findContactByPhoneNumber
