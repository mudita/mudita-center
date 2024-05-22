/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Contact,
  ContactCategory,
  ResultState,
} from "Core/contacts/reducers/contacts.interface"

export interface ContactListProps {
  activeRow?: Contact
  selectedContact: Contact | null
  onSelect: (contact: Contact) => void
  editMode?: boolean
  resultsState: ResultState
  toggleRow: (id: string) => void
  selectedItems: string[]
  onExport: (ids: string[]) => void
  onDelete: (id: string) => void
  onEdit: (contact: Contact) => void
  contactList: ContactCategory[]
}
