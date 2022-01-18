/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState, RootState } from "Renderer/store"
import { ContactsState } from "App/contacts/reducers/contacts.interface"
import { contactsStateSelector } from "App/contacts/selectors/contacts-state.selector"
import { getSpeedDialChosenList } from "App/contacts/helpers/contacts.helpers"

export const speedDialChosenListSelector = createSelector<
  ReduxRootState,
  ContactsState,
  number[]
>(contactsStateSelector, (state) => {
  return getSpeedDialChosenList(state)
})
