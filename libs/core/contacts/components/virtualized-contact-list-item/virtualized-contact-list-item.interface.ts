/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "Core/contacts/dto"

export interface VirtualizedContactListItemProps {
  isActive: boolean
  editMode: boolean | undefined
  selectedItems: string[]
  toggleRow: (id: string) => void
  onExport: (ids: string[]) => void
  onEdit: (contact: Contact) => void
  onDelete: (id: string) => void
  onSelect: (contact: Contact) => void
  contact: Contact
  testId?: string
  disableScroll: () => void
  enableScroll: () => void
}
