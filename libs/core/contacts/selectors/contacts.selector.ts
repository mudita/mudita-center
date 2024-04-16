/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  Contact,
  ContactsState,
} from "Core/contacts/reducers/contacts.interface"
import { contactsStateSelector } from "Core/contacts/selectors/contacts-state.selector"
import { getContacts } from "Core/contacts/helpers/contacts.helpers"
import { sortByLastNameAscending } from "Core/utils/sort-by-last-name-ascending"

export const contactsSelector = createSelector<
  ReduxRootState,
  ContactsState,
  Contact[]
>(contactsStateSelector, (state) => {
  return getContacts(state).sort(sortByLastNameAscending)
})
