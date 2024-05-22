/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ContactsState } from "Core/contacts/reducers/contacts.interface"
import { contactsStateSelector } from "Core/contacts/selectors/contacts-state.selector"
import { getSpeedDialChosenList } from "Core/contacts/helpers/contacts.helpers"

export const speedDialChosenListSelector = createSelector<
  ReduxRootState,
  ContactsState,
  number[]
>(contactsStateSelector, (state) => {
  return getSpeedDialChosenList(state)
})
