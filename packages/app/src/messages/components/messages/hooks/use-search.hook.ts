/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataIndex } from "App/index-storage/constants"
import { MessagesState } from "App/messages/components/messages/messages.enum"
import { MessagesProps } from "App/messages/components/messages/messages.interface"
import { Message, Thread } from "App/messages/dto"
import { useEffect, useState } from "react"

interface Props
  extends Pick<
    MessagesProps,
    "searchMessages" | "markThreadsReadStatus" | "threads"
  > {
  activeThread: Thread | undefined
  openThreadDetails: (thread: Thread) => void
  setActiveThread: (thread: Thread | undefined) => void
}

interface UseSearchHook {
  searchValue: string
  searchByQuery: (query: string) => void
  selectSearchedRecord: (record: Thread | Message) => void
  startSearchMode: () => void
  activeSearchDropdown: boolean
  searchedMessage: Message | null
  lastSearchQuery: string
  selectSearchedMessage: (message: Message) => void
  clearLastSearch: () => void
  searchMessagesBySavedSearchQuery: () => void
}

export const useSearch = ({
  searchMessages,
  activeThread,
  threads,
  openThreadDetails,
  markThreadsReadStatus,
  setActiveThread,
}: Props): UseSearchHook => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [messagesState, setMessagesState] = useState(MessagesState.List)
  const [activeSearchDropdown, setActiveSearchDropdown] =
    useState<boolean>(false)
  const [searchedMessage, setSearchedMessage] = useState<Message | null>(null)
  const [lastSearchQuery, setLastSearchQuery] = useState<string>("")

  useEffect(() => {
    if (searchValue !== "") {
      return
    }
    if (messagesState === MessagesState.SearchResult) {
      setMessagesState(MessagesState.List)
    }
    setActiveSearchDropdown(false)
    setSearchedMessage(null)
  }, [searchValue, messagesState])

  const searchByQuery = (query: string) => {
    setSearchValue(query)

    if (query.length > 0) {
      setLastSearchQuery(query)
      setActiveSearchDropdown(true)
      searchMessages({
        scope: [DataIndex.Message, DataIndex.Thread],
        query: query,
      })
    } else {
      if (!activeThread) {
        setMessagesState(MessagesState.List)
      }
    }
  }

  const searchMessagesBySavedSearchQuery = () => {
    searchMessages({ scope: [DataIndex.Message], query: searchValue })
  }

  const startSearchMode = () => {
    setMessagesState(MessagesState.SearchResult)
    setActiveThread(undefined)
    searchMessagesBySavedSearchQuery()
  }

  const selectSearchedRecord = (record: Thread | Message) => {
    const isMessage = (record: Thread | Message): record is Message => {
      return Boolean((record as Message).threadId)
    }

    if (!record) {
      return
    }

    if (isMessage(record)) {
      selectSearchedMessage(record)
    } else {
      openThreadDetails(record)
    }
  }

  const selectSearchedMessage = (message: Message): void => {
    const thread = threads.find((thread) => thread.id === message.threadId)
    if (thread && activeThread?.id !== message.threadId) {
      setSearchedMessage(message)
      openThreadDetails(thread)
      if (!thread.unread) {
        return
      }

      markThreadsReadStatus([thread])
    }
  }

  const clearLastSearch = () => setLastSearchQuery("")

  return {
    searchValue,
    searchByQuery,
    selectSearchedRecord,
    startSearchMode,
    activeSearchDropdown,
    searchedMessage,
    lastSearchQuery,
    selectSearchedMessage,
    clearLastSearch,
    searchMessagesBySavedSearchQuery,
  }
}
