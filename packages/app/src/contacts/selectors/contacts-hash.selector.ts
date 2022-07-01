/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Contact } from "App/contacts/dto"
import { flatListSelector } from "App/contacts/selectors/flat-list.selector"
import { ContactsHashTable } from "App/contacts/data-structures"

export const contactHashSelector = createSelector<
  ReduxRootState,
  Contact[],
  ContactsHashTable
>(flatListSelector, (state) => {
  const contactsHash = new ContactsHashTable()
  state.forEach((contact) => {
    contactsHash.push(contact)
  })
  return contactsHash
})
