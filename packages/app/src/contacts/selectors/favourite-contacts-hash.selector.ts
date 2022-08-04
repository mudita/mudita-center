/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FavouriteContactsHashTable } from "App/contacts/data-structures"
import { Contact } from "App/contacts/dto"
import { flatListSelector } from "App/contacts/selectors/flat-list.selector"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { createSelector, OutputSelector } from "reselect"

export const favouriteContactHashSelector = (
  withPhoneNumberOnly: boolean
): OutputSelector<
  ReduxRootState,
  FavouriteContactsHashTable,
  (res: Contact[]) => FavouriteContactsHashTable
> => {
  return createSelector<ReduxRootState, Contact[], FavouriteContactsHashTable>(
    flatListSelector,
    (stateContacts) => {
      const contacts = withPhoneNumberOnly
        ? stateContacts.filter(
            (item) => item.primaryPhoneNumber || item.secondaryPhoneNumber
          )
        : stateContacts
      const contactsHash = new FavouriteContactsHashTable()

      contacts
        .filter((contact) => contact.favourite)
        .forEach((contact) => {
          contactsHash.push(contact)
        })

      return contactsHash
    }
  )
}
