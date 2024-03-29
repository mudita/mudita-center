/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ContactsHashTable,
  FavouriteContactsHashTable,
} from "Core/contacts/data-structures"
import { Contact } from "Core/contacts/dto"

export interface ContactSimpleListProps {
  contacts: ContactsHashTable
  favouriteContacts?: FavouriteContactsHashTable
  onContactSelect?: (contact: Contact) => void
  onPhoneNumberSelect?: (phoneNumber: string) => void
}
