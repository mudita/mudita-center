/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  filterThreads,
  searchThreads,
  sortThreads,
} from "App/messages/store/threads.helpers"
import {
  createFullMessagesCollection,
  updateNormalizeMessages,
  updateNormalizeThreads,
  updateMessagesInThreads,
} from "App/messages/store/messages.helpers"
import { createSelector, Slicer, StoreSelectors } from "@rematch/select"
import { isCallerMatchingPhoneNumber } from "Renderer/models/calls/caller-utils.ts"
import { Caller } from "Renderer/models/calls/calls.interface"
import { threadsData } from "App/seeds/messages"
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
import getMessages from "Renderer/requests/get-messages.request"

export const initialState: MessagesState = {
  threads: { byId: {}, allIds: [] },
  messages: { byId: {}, allIds: [] },
  messagesInThreads: {},
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
        const {
          data: messagesData = [],
          error: messagesError,
        } = await getMessages()

        if (error || messagesError) {
          logger.error(error)
          dispatch.messages.setResultsState(ResultsState.Error)
        } else {
          dispatch.messages.setState({
            threads: updateNormalizeThreads(rootState.messages.threads, data),
            messages: updateNormalizeMessages(
              rootState.messages.messages,
              messagesData
            ),
            messagesInThreads: updateMessagesInThreads(
              rootState.messages.messagesInThreads,
              messagesData
            ),
          })
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
      return slice((state) =>
        Object.keys(state.threads.byId).map(
          (key: string): Thread => state.threads.byId[key]
        )
      )
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
