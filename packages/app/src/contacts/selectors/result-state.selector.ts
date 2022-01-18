/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Renderer/store"
import {
  ContactsState,
  ResultState,
} from "App/contacts/reducers/contacts.interface"
import { contactsStateSelector } from "App/contacts/selectors/contacts-state.selector"

export const resultStateSelector = createSelector<
  ReduxRootState,
  ContactsState,
  ResultState
>(contactsStateSelector, ({ resultState }) => {
  return resultState
})
