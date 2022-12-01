/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import {
  ContactsState,
  PhoneContacts,
} from "App/contacts/reducers/contacts.interface"
import { contactsStateSelector } from "App/contacts/selectors/contacts-state.selector"

export const getContactMapSelector = createSelector<
  ReduxRootState,
  ContactsState,
  PhoneContacts["db"]
>(contactsStateSelector, ({ db }) => {
  return db
})
