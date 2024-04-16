/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { Contact, ContactID, ContactsState } from "Core/contacts/reducers"
import { contactsStateSelector } from "Core/contacts/selectors/contacts-state.selector"

export const getContactSelector = (
  id: ContactID
): OutputSelector<
  ReduxRootState,
  Contact | undefined,
  (res: ContactsState) => Contact | undefined
> => {
  return createSelector<ReduxRootState, ContactsState, Contact | undefined>(
    contactsStateSelector,
    (state) => {
      return state.db[id]
    }
  )
}
