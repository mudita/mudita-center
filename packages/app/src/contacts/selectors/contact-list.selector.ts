/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { ContactsState } from "App/contacts/reducers/contacts.interface"
import { ContactCategory } from "App/contacts/dto"
import { contactsStateSelector } from "App/contacts/selectors/contacts-state.selector"
import { getSortedContactList } from "App/contacts/helpers/contacts.helpers"

export const contactListSelector = createSelector<
  ReduxRootState,
  ContactsState,
  ContactCategory[]
>(contactsStateSelector, (state) => {
  return getSortedContactList(state)
})
