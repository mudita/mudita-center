/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, Slicer, StoreSelectors } from "@rematch/select"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"
import {
  Message,
  MessageIdsInThreadMap,
  MessageMap,
  MessagesState,
  ResultState,
  Thread,
  ThreadMap,
  VisibilityFilter,
} from "App/messages/store/messages.interface"
import { RootState } from "Renderer/store"
import getThreads from "Renderer/requests/get-threads.request"
import logger from "App/main/utils/logger"
import { Contact, ContactID } from "App/contacts/store/contacts.type"
import getMessagesByThreadId from "Renderer/requests/get-messages-by-thread-id.request"
import {
  filterThreads,
  searchThreads,
  sortMessages,
  sortThreads,
} from "App/messages/store/threads.helpers"

export const initialState: MessagesState = {
  threadMap: {},
  messageMap: {},
  messageIdsInThreadMap: {},
  searchValue: "",
  resultState: ResultState.Empty,
  visibilityFilter: VisibilityFilter.All,
  messagesResultStateMap: {},
}

const messages = createModel<RootModel>({
  state: initialState,
  reducers: {
    setResultState(
      state: MessagesState,
      resultState: ResultState
    ): MessagesState {
      return { ...state, resultState }
    },
    setMessagesResultsMapState(
      state: MessagesState,
      { resultState, threadId }: { resultState: ResultState; threadId: string }
    ): MessagesState {
      return {
        ...state,
        messagesResultStateMap: {
          ...state.messagesResultStateMap,
          [threadId]: resultState,
        },
      }
    },
    setThreadMap(state: MessagesState, threads: Thread[]): MessagesState {
      return {
        ...state,
        threadMap: threads.reduce((prevThreadMap, thread) => {
          prevThreadMap[thread.id] = thread
          return prevThreadMap
        }, {} as ThreadMap),
      }
    },
    updateMessages(state: MessagesState, messages: Message[]): MessagesState {
      return {
        ...state,
        messageMap: messages.reduce((prevMessageMap: MessageMap, message) => {
          prevMessageMap[message.id] = message
          return prevMessageMap
        }, {}),
        messageIdsInThreadMap: messages.reduce(
          (prev: MessageIdsInThreadMap, message) => {
            const messageIds = prev[message.threadId] ?? []
            prev[message.threadId] = messageIds.find((id) => id === message.id)
              ? messageIds
              : [...messageIds, message.id]

            return prev
          },
          {}
        ),
      }
    },
    changeSearchValue(
      state: MessagesState,
      searchValue: MessagesState["searchValue"]
    ) {
      return { ...state, searchValue }
    },
    changeVisibilityFilter(
      state: MessagesState,
      visibilityFilter: MessagesState["visibilityFilter"]
    ) {
      return { ...state, visibilityFilter }
    },
    deleteThreads(state: MessagesState, ids: string[]) {
      ids.forEach((id) => {
        delete state.threadMap[id]
        delete state.messageIdsInThreadMap[id]
      })

      const messageMap = Object.keys(state.messageMap).reduce(
        (prevMessageMap, id) => {
          const { threadId } = state.messageMap[id]
          if (ids.includes(threadId)) {
            return prevMessageMap
          } else {
            prevMessageMap[id] = state.messageMap[id]
            return prevMessageMap
          }
        },
        {} as MessageMap
      )

      return {
        ...state,
        messageMap: messageMap,
        threadMap: state.threadMap,
        messageIdsInThreadMap: state.messageIdsInThreadMap,
      }
    },
    markAsRead(state: MessagesState, ids: string[]) {
      const threadMap = Object.keys(state.threadMap).reduce(
        (prevThreadMap, id) => {
          if (ids.includes(id)) {
            const thread = prevThreadMap[id]
            prevThreadMap[id] = {
              ...thread,
              unread: false,
            }
            return prevThreadMap
          } else {
            return prevThreadMap
          }
        },
        state.threadMap
      )

      return { ...state, threadMap }
    },
    toggleReadStatus(state: MessagesState, ids: string[]) {
      const threadMap = Object.keys(state.threadMap).reduce(
        (prevThreadMap, id) => {
          if (ids.includes(id)) {
            const thread = prevThreadMap[id]
            prevThreadMap[id] = {
              ...thread,
              unread: !thread.unread,
            }
            return prevThreadMap
          } else {
            return prevThreadMap
          }
        },
        state.threadMap
      )

      return { ...state, threadMap }
    },
    _devClearAllThreads(state: MessagesState) {
      return {
        ...state,
        threadMap: {},
        messageMap: {},
        messageIdsInThreadMap: {},
      }
    },
  },
  effects: (d) => {
    const dispatch = (d as unknown) as RootState
    const messagesLoadMap: { [key: string]: boolean } = {}
    let loading = false

    return {
      async loadData() {
        if (loading) {
          return
        }
        loading = true
        dispatch.messages.setResultState(ResultState.Loading)

        const { data = [], error } = await getThreads()

        if (error) {
          logger.error(error)
          dispatch.messages.setResultState(ResultState.Error)
        } else {
          dispatch.messages.setThreadMap(data)
          dispatch.messages.setResultState(ResultState.Loaded)
        }

        loading = false
      },
      async loadMessagesByThreadId(threadId: string) {
        const messagesLoad = messagesLoadMap[threadId]

        if (messagesLoad !== undefined && messagesLoad) {
          return
        }

        messagesLoadMap[threadId] = true

        dispatch.messages.setMessagesResultsMapState({
          resultState: ResultState.Loading,
          threadId,
        })

        const { data = [], error } = await getMessagesByThreadId(threadId)
        if (error) {
          logger.error(error)

          dispatch.messages.setMessagesResultsMapState({
            resultState: ResultState.Error,
            threadId,
          })
        } else {
          dispatch.messages.updateMessages(data)
          dispatch.messages.setMessagesResultsMapState({
            resultState: ResultState.Loaded,
            threadId,
          })
        }

        messagesLoadMap[threadId] = false
      },
    }
  },
  selectors: (slice: Slicer<MessagesState>) => ({
    searchValue() {
      return slice((state) => state.searchValue)
    },
    visibilityFilter() {
      return slice((state) => state.visibilityFilter)
    },
    threads() {
      return slice((state) =>
        Object.keys(state.threadMap).map(
          (key: string): Thread => state.threadMap[key]
        )
      )
    },
    filteredThreads(models: StoreSelectors<any>) {
      return createSelector(
        models.messages.threads,
        models.contacts.getContactMap,
        models.messages.searchValue,
        models.messages.visibilityFilter,
        (
          threads: Thread[],
          contactMap: Record<ContactID, Contact>,
          searchValue: string,
          visibilityFilter: VisibilityFilter
        ) => {
          let list = searchThreads(threads, contactMap, searchValue)
          list = filterThreads(list, visibilityFilter)
          return sortThreads(list)
        }
      )
    },
    getMessagesResultMapStateByThreadId() {
      return (state: { messages: MessagesState }) => {
        return (threadId: string) => {
          return (
            state.messages.messagesResultStateMap[threadId] ?? ResultState.Empty
          )
        }
      }
    },
    getMessagesByThreadId() {
      return (state: { messages: MessagesState }) => {
        return (threadId: string) => {
          const messageIds =
            state.messages.messageIdsInThreadMap[threadId] ?? []
          const messages = messageIds.map(
            (messageId) => state.messages.messageMap[messageId]
          )
          return sortMessages(messages)
        }
      }
    },
    isThreadOpened() {
      return (state: { messages: MessagesState }) => {
        const numbers: string[] = Object.keys(state.messages.threadMap)
        return (phoneNumber: string) => {
          return !numbers.some((number) => number === phoneNumber)
        }
      }
    },
  }),
})

export default messages
