/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Contact } from "App/contacts/reducers"
import { flatListSelector } from "App/contacts/selectors/flat-list.selector"
import { isContactMatchingPhoneNumberId } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"

export const getContactByPhoneNumberSelector = (
  phoneNumberId: string
): OutputSelector<
  ReduxRootState,
  Contact | undefined,
  (res: Contact[]) => Contact | undefined
> => {
  return createSelector<ReduxRootState, Contact[], Contact | undefined>(
    flatListSelector,
    (contacts) => {
      console.log(
        "getContactByPhoneNumberSelector contacts",
        contacts,
        "phoneNumberId",
        phoneNumberId
      )
      const result = contacts.find((contact) =>
        isContactMatchingPhoneNumberId(contact, phoneNumberId)
      )

      console.log("getContactByPhoneNumberSelector result", result)
      return result
    }
  )
}
