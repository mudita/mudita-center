/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "Core/contacts/dto"
import { ContactCategory } from "Core/contacts/reducers/contacts.interface"

export interface VirtualizedContactListProps {
  testId?: string
  activeRow: Contact | undefined
  editMode: boolean | undefined
  toggleRow: (id: string) => void
  onExport: (ids: string[]) => void
  onEdit: (contact: Contact) => void
  onForward: (contact: Contact) => void
  onBlock: (contact: Contact) => void
  onUnblock: (contact: Contact) => void
  onDelete: (id: string) => void
  onSelect: (contact: Contact) => void
  componentContactList: ContactCategory[]
  selectedContact: Contact | null
  selectedItems: string[]
  disableScroll: () => void
  enableScroll: () => void
}
