/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  ContactsState,
  PhoneContacts,
} from "Core/contacts/reducers/contacts.interface"
import { contactsStateSelector } from "Core/contacts/selectors/contacts-state.selector"

export const getContactMapSelector = createSelector<
  ReduxRootState,
  ContactsState,
  PhoneContacts["db"]
>(contactsStateSelector, ({ db }) => {
  return db
})
