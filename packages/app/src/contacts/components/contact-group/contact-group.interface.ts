/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact, ContactCategory } from "App/contacts/dto"

export interface ContactGroupProps {
  parentRef: HTMLElement | undefined
  category: string
  contacts: Contact[]
  activeRow: Contact | undefined
  editMode: boolean | undefined
  selectedItems: string[]
  toggleRow: (id: string) => void
  onExport: (ids: string[]) => void
  onEdit: (contact: Contact) => void
  onForward: (contact: Contact) => void
  onBlock: (contact: Contact) => void
  onUnblock: (contact: Contact) => void
  onDelete: (id: string) => void
  onSelect: (contact: Contact) => void
  categoryIndex: number
  componentContactList: ContactCategory[]
  disableScroll: () => void
  enableScroll: () => void
}

export interface ScrollWrapperProps {
  active: boolean
  hasMore: boolean
  page: number
  parentRef: HTMLElement | undefined
  loadMore: (page: number) => void
}
