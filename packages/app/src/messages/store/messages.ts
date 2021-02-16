/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  filterThreads,
  searchThreads,
  sortThreads,
} from "App/messages/store/threads.helpers"
import { createFullMessagesCollection } from "App/messages/store/messages.helpers"
import { createSelector, Slicer, StoreSelectors } from "@rematch/select"
import { isCallerMatchingPhoneNumber } from "Renderer/models/calls/caller-utils.ts"
import { Caller } from "Renderer/models/calls/calls.interface"
import { messagesData } from "App/seeds/messages"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"
import {
  MessagesState,
  ResultsState,
  Thread,
} from "App/messages/store/messages.interface"
import { RootState } from "Renderer/store"
import getThreads from "Renderer/requests/get-threads.request"
import logger from "App/main/utils/logger"

export const initialState: MessagesState = {
  threads: [],
  searchValue: "",
  resultsState: ResultsState.Empty,
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
    setThreads(state: MessagesState, threads: Thread[]): MessagesState {
      return { ...state, threads }
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
      const threads = state.threads.filter(({ id }) => !ids.includes(id))
      return { ...state, threads }
    },
    markAsRead(state: MessagesState, ids: string[]) {
      const withMarkAsReadThreads = state.threads.map((thread) => {
        if (ids.includes(thread.id)) {
          return {
            ...thread,
            unread: false,
          }
        }
        return thread
      })
      return { ...state, threads: withMarkAsReadThreads }
    },
    toggleReadStatus(state: MessagesState, ids: string[]) {
      const withMarkAsUnreadThreads = state.threads.map((thread) => {
        if (ids.includes(thread.id)) {
          return {
            ...thread,
            unread: !thread.unread,
          }
        }
        return thread
      })
      return { ...state, threads: withMarkAsUnreadThreads }
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
        threads: messagesData,
      }
    },
  },
  effects: (d) => {
    const dispatch = (d as unknown) as RootState
    return {
      async loadData(
        _: any,
        rootState: { messages: { resultsState: ResultsState } }
      ) {
        if (rootState.messages.resultsState === ResultsState.Loading) {
          return
        }

        dispatch.messages.setResultsState(ResultsState.Loading)

        const { data = [], error } = await getThreads()
        if (error) {
          logger.error(error)
          dispatch.messages.setResultsState(ResultsState.Error)
        } else {
          dispatch.messages.setThreads(data)
          dispatch.messages.setResultsState(ResultsState.Loaded)
        }
      },
    }
  },
  selectors: (slice: Slicer<MessagesState>) => ({
    filteredList() {
      return (state: any) => {
        let list = createFullMessagesCollection(state)
        list = searchThreads(list, state.messages.searchValue)
        list = filterThreads(list, state.messages.visibilityFilter)
        return sortThreads(list)
      }
    },
    getThreads() {
      return slice((state) => state.threads)
    },
    getAllCallers(models: StoreSelectors<MessagesState>) {
      return createSelector(models.messages.getThreads, (threads: Thread[]) => {
        return threads.map(({ caller }) => caller)
      })
    },
    isThreadOpened(models: StoreSelectors<MessagesState>) {
      return (state: MessagesState) => {
        const callers: Caller[] = models.messages.getAllCallers(state)
        return (phoneNumber: string) => {
          return !callers.some((caller) =>
            isCallerMatchingPhoneNumber(caller, phoneNumber)
          )
        }
      }
    },
  }),
})

export default messages
