/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import {
  Contact,
  ContactsState,
} from "App/contacts/reducers/contacts.interface"
import { contactsStateSelector } from "App/contacts/selectors/contacts-state.selector"
import { getFlatList } from "App/contacts/helpers/contacts.helpers"

export const flatListSelector = createSelector<
  ReduxRootState,
  ContactsState,
  Contact[]
>(contactsStateSelector, (state) => {
  return getFlatList(state)
})
