/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact, ResultState } from "App/contacts/reducers/contacts.interface"
import { ContactCategory } from "App/contacts/dto"

export interface ContactListProps {
  activeRow?: Contact
  selectedContact: Contact | null
  onSelect: (contact: Contact) => void
  editMode?: boolean
  resultsState: ResultState
  toggleRow: (id: string) => void
  selectedItems: string[]
  onExport: (ids: string[]) => void
  onForward: (contact: Contact) => void
  onBlock: (contact: Contact) => void
  onUnblock: (contact: Contact) => void
  onDelete: (id: string) => void
  onEdit: (contact: Contact) => void
  contactList: ContactCategory[]
}
