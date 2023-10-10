/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Contact } from "App/contacts/reducers"
import { flatListSelector } from "App/contacts/selectors/flat-list.selector"

export const isContactCreatedSelector = (
  id: string
): OutputSelector<ReduxRootState, boolean, (res: Contact[]) => boolean> => {
  return createSelector<ReduxRootState, Contact[], boolean>(
    flatListSelector,
    (contacts) => {
      return contacts.some((contact) => contact.id === id)
    }
  )
}
