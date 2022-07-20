/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactsHashTable } from "App/contacts/data-structures"
import { Contact } from "App/contacts/dto"

export interface ContactSimpleListProps {
  contacts: ContactsHashTable
  onContactSelect?: (contact: Contact) => void
  onPhoneNumberSelect?: (phoneNumber: string) => void
}
