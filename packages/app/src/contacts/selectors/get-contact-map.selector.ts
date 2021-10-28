/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState, RootState } from "Renderer/store"
import { PhoneContacts } from "App/contacts/store/contacts.interface"
import { contactsStateSelector } from "App/contacts/selectors/contacts-state.selector"
import { ContactsState } from "App/contacts/store/contacts.type"

export const getContactMapSelector = createSelector<
  RootState & ReduxRootState,
  ContactsState,
  PhoneContacts["db"]
>(contactsStateSelector, ({ db }) => {
  return db
})
