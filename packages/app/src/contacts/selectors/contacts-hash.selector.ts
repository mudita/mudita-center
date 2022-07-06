/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactsHashTable } from "App/contacts/data-structures"
import { Contact } from "App/contacts/dto"
import { flatListSelector } from "App/contacts/selectors/flat-list.selector"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { createSelector, OutputSelector } from "reselect"

export const contactHashSelector = (
  withPhoneNumberOnly: boolean
): OutputSelector<
  ReduxRootState,
  ContactsHashTable,
  (res: Contact[]) => ContactsHashTable
> => {
  return createSelector<ReduxRootState, Contact[], ContactsHashTable>(
    flatListSelector,
    (stateContacts) => {
      const contacts = withPhoneNumberOnly
        ? stateContacts.filter(
            (item) => item.primaryPhoneNumber || item.secondaryPhoneNumber
          )
        : stateContacts
      const contactsHash = new ContactsHashTable()
      contacts.forEach((contact) => {
        contactsHash.push(contact)
      })
      return contactsHash
    }
  )
}
