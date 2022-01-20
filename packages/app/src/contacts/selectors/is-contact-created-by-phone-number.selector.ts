/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { ReduxRootState } from "Renderer/store"
import { Contact } from "App/contacts/reducers"
import { flatListSelector } from "App/contacts/selectors/flat-list.selector"
import { isContactMatchingPhoneNumber } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"

export const isContactCreatedByPhoneNumberSelector = (
  phoneNumber: string
): OutputSelector<ReduxRootState, boolean, (res: Contact[]) => boolean> => {
  return createSelector<ReduxRootState, Contact[], boolean>(
    flatListSelector,
    (contacts) => {
      return contacts.some((contact) =>
        isContactMatchingPhoneNumber(contact, phoneNumber)
      )
    }
  )
}
