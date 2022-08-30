/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Thread, Message } from "App/messages/dto"
import { SearchResult } from "App/search/dto"

export interface MessagesPanelProps {
  searchValue: string
  onSearchValueChange: (value: string) => void
  onNewMessageClick: () => void
  buttonDisabled: boolean
  selectedIds: string[]
  allItemsSelected: boolean
  toggleAll: (event: React.ChangeEvent<Element> | undefined) => void
  onDeleteClick: () => void
  onSearchEnterClick: () => void
  onSelect: (record: Thread & Message) => void
  showSearchResults?: boolean
  results: SearchResult
}
