/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Contact } from "App/contacts/dto"

export interface ContactItemProps {
  contact: Contact
  selected: boolean
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
  disableScroll: () => void
  enableScroll: () => void
  style: React.CSSProperties | undefined
  scrollActive: boolean
  showCheckbox: boolean
}
