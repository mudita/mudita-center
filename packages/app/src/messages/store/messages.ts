/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { createSelector, Slicer, StoreSelectors } from "@rematch/select"
import { threadsData } from "App/seeds/messages"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"
import {
  Message,
  MessagesState,
  ResultsState,
  Thread,
  VisibilityFilter,
} from "App/messages/store/messages.interface"
import { RootState } from "Renderer/store"
import getThreads from "Renderer/requests/get-threads.request"
import logger from "App/main/utils/logger"
import {
  Contact,
  ContactID,
  ContactsState,
} from "App/contacts/store/contacts.type"
import getMessagesByThreadId from "Renderer/requests/get-messages-by-thread-id.request"
import {
  filterThreads,
  searchThreads,
  sortThreads,
} from "App/messages/store/threads.helpers"

export const initialState: MessagesState = {
  threadMap: {},
  messageMap: {},
  messageIdsInThreadMap: {},
  searchValue: "",
  resultsState: ResultsState.Empty,
  visibilityFilter: VisibilityFilter.All,
  messagesResultsStateMap: {},
}

const messages = createModel<RootModel>({
  state: initialState,
  reducers: {
    setResultsState(
      state: MessagesState,
      resultsState: ResultsState
    ): MessagesState {
      return { ...state, resultsState }
    },
    setMessagesResultsMapState(
      state: MessagesState,
      {
        resultsState,
        threadId,
      }: { resultsState: ResultsState; threadId: string }
    ): MessagesState {
      return {
        ...state,
        messagesResultsStateMap: {
          ...state.messagesResultsStateMap,
          [threadId]: resultsState,
        },
      }
    },
    updateThreadMap(state: MessagesState, threads: Thread[]): MessagesState {
      return {
        ...state,
        threadMap: threads.reduce((prevThreadMap, thread) => {
          prevThreadMap[thread.id] = thread
          return prevThreadMap
        }, state.threadMap),
      }
    },
    updateMessages(state: MessagesState, messages: Message[]): MessagesState {
      return {
        ...state,
        messageMap: messages.reduce((prevMessageMap, message) => {
          prevMessageMap[message.id] = message
          return prevMessageMap
        }, state.messageMap),
        messageIdsInThreadMap: messages.reduce((prev, message) => {
          const messageIds = prev[message.threadId] ?? []
          prev[message.threadId] = messageIds.find((id) => id === message.id)
            ? messageIds
            : [...messageIds, message.id]

          return prev
        }, state.messageIdsInThreadMap),
      }
    },
    setState(state: MessagesState, newState: MessagesState): MessagesState {
      return { ...state, ...newState }
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
      ids.forEach((id) => delete state.threadMap[id])
      return { ...state, threadMap: state.threadMap }
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
        threads: [],
      }
    },
    _devLoadDefaultThreads(state: MessagesState) {
      return {
        ...state,
        threads: threadsData,
      }
    },
  },
  effects: (d) => {
    const dispatch = (d as unknown) as RootState
    return {
      async loadData(_: any, rootState: { messages: MessagesState }) {
        if (rootState.messages.resultsState === ResultsState.Loading) {
          return
        }

        dispatch.messages.setResultsState(ResultsState.Loading)

        const { data = [], error } = await getThreads()

        if (error) {
          logger.error(error)
          dispatch.messages.setResultsState(ResultsState.Error)
        } else {
          dispatch.messages.updateThreadMap(data)
          dispatch.messages.setResultsState(ResultsState.Loaded)
        }
      },
      async loadMessagesByThreadId(
        threadId: string,
        rootState: { messages: MessagesState }
      ) {
        const messagesResultState =
          rootState.messages.messagesResultsStateMap[threadId]
        if (
          messagesResultState !== undefined &&
          messagesResultState === ResultsState.Loading
        ) {
          return
        }

        dispatch.messages.setMessagesResultsMapState({
          resultsState: ResultsState.Loading,
          threadId,
        })

        const { data = [], error } = await getMessagesByThreadId(threadId)
        if (error) {
          logger.error(error)

          dispatch.messages.setMessagesResultsMapState({
            resultsState: ResultsState.Error,
            threadId,
          })
        } else {
          dispatch.messages.updateMessages(data)
          dispatch.messages.setMessagesResultsMapState({
            resultsState: ResultsState.Loaded,
            threadId,
          })
        }
      },
    }
  },
  selectors: (slice: Slicer<MessagesState>) => ({
    getSearchValue() {
      return slice((state) => state.searchValue)
    },
    getVisibilityFilter() {
      return slice((state) => state.visibilityFilter)
    },
    getThreads() {
      return slice((state) =>
        Object.keys(state.threadMap).map(
          (key: string): Thread => state.threadMap[key]
        )
      )
    },
    filteredList(models: StoreSelectors<any>) {
      return createSelector(
        models.messages.getThreads,
        models.contacts.getContactsMap,
        models.messages.getSearchValue,
        models.messages.getVisibilityFilter,
        (
          threads: Thread[],
          contactsMap: Record<ContactID, Contact>,
          searchValue: string,
          visibilityFilter: VisibilityFilter
        ) => {
          let list = searchThreads(threads, contactsMap, searchValue)
          list = filterThreads(list, visibilityFilter)
          return sortThreads(list)
        }
      )
    },
    getContactByContactId() {
      return (state: { messages: MessagesState; contacts: ContactsState }) => {
        return (contactId: string) => {
          return (
            state.contacts.db[contactId] ?? {
              id: contactId,
              firstName: "",
              lastName: "",
              primaryPhoneNumber: "",
              email: "",
              note: "",
              firstAddressLine: "",
            }
          )
        }
      }
    },
    getMessagesResultsMapStateByThreadId() {
      return (state: { messages: MessagesState }) => {
        return (threadId: string) => {
          return (
            state.messages.messagesResultsStateMap[threadId] ??
            ResultsState.Empty
          )
        }
      }
    },
    getMessagesByThreadId() {
      return (state: { messages: MessagesState }) => {
        return (threadId: string) => {
          const messageIds =
            state.messages.messageIdsInThreadMap[threadId] ?? []
          return messageIds.map(
            (messageId) => state.messages.messageMap[messageId]
          )
        }
      }
    },
    getAllCallers(models: StoreSelectors<MessagesState>) {
      return createSelector(models.messages.getThreads, (threads: Thread[]) => {
        // return threads.map(({ caller }) => caller)
        return []
      })
    },
    isThreadOpened(models: StoreSelectors<MessagesState>) {
      return (state: MessagesState) => {
        // const callers: Caller[] = models.messages.getAllCallers(state)
        return (phoneNumber: string) => {
          // return !callers.some((caller) =>
          //   isCallerMatchingPhoneNumber(caller, phoneNumber)
          // )
          return false
        }
      }
    },
  }),
})

export default messages
