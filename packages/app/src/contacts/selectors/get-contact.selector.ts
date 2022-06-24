/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Contact, ContactID, ContactsState } from "App/contacts/reducers"
import { contactsStateSelector } from "App/contacts/selectors/contacts-state.selector"

export const getContactSelector = (
  id: ContactID
): OutputSelector<ReduxRootState, Contact | undefined, (res: ContactsState) => Contact | undefined> => {
  return createSelector<ReduxRootState, ContactsState, Contact | undefined>(
    contactsStateSelector,
    (state) => {
      return state.db[id]
    }
  )
}
