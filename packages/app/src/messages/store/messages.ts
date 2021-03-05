/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  updateMessagesInThreads,
  updateNormalizeMessages,
  updateNormalizeThreads,
} from "App/messages/store/messages.helpers"
import { createSelector, Slicer, StoreSelectors } from "@rematch/select"
import { threadsData } from "App/seeds/messages"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"
import {
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
  searchThreads, sortThreads,
} from "App/messages/store/threads.helpers"

export const initialState: MessagesState = {
  threads: { byId: {}, allIds: [] },
  messages: { byId: {}, allIds: [] },
  messagesInThreads: {},
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
    deleteConversation(state: MessagesState, ids: string[]) {
      return { ...state }
    },
    markAsRead(state: MessagesState, ids: string[]) {
      return { ...state }
    },
    toggleReadStatus(state: MessagesState, ids: string[]) {
      return { ...state }
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
          dispatch.messages.setState({
            threads: updateNormalizeThreads(rootState.messages.threads, data),
          })
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
          dispatch.messages.setState({
            messages: updateNormalizeMessages(
              rootState.messages.messages,
              data
            ),
            messagesInThreads: updateMessagesInThreads(
              rootState.messages.messagesInThreads,
              data
            ),
          })
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
        Object.keys(state.threads.byId).map(
          (key: string): Thread => state.threads.byId[key]
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
          const messagesInThread =
            state.messages.messagesInThreads[threadId] ?? []
          return messagesInThread.map((id) => state.messages.messages.byId[id])
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
