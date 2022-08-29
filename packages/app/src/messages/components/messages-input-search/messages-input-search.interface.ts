/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Message, Thread } from "App/messages/dto"

export interface MessagesInputSearchProps {
  onSelect: (thread: Thread) => void
  onSearchEnterClick: () => void
  showSearchResults?: boolean
  searchValue: string
  onSearchValueChange: (value: string) => void
  results: { messages: Message[]; threads: Thread[] }
}
