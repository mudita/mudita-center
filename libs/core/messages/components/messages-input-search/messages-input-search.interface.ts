/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Thread, Message } from "Core/messages/dto"
import { SearchResult } from "Core/search/dto"

export interface MessagesInputSearchProps {
  onSelect: (record: Thread | Message) => void
  onSearchEnterClick: () => void
  showSearchResults?: boolean
  searchValue: string
  onSearchValueChange: (value: string) => void
  results: SearchResult
}
