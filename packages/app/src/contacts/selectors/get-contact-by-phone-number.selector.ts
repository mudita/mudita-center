/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Contact } from "App/contacts/reducers"
import { contactsSelector } from "App/contacts/selectors/contacts.selector"
import { isContactMatchingPhoneNumber } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"

export const getContactByPhoneNumberSelector = (
  phoneNumber: string
): OutputSelector<
  ReduxRootState,
  Contact | undefined,
  (res: Contact[]) => Contact | undefined
> => {
  return createSelector<ReduxRootState, Contact[], Contact | undefined>(
    contactsSelector,
    (contacts) => {
      return contacts.find((contact) =>
        isContactMatchingPhoneNumber(contact, phoneNumber)
      )
    }
  )
}
