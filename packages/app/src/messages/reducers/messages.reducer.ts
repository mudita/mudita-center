/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers"
import {
  ChangeSearchValueAction,
  ChangeVisibilityFilterAction,
  DeleteThreadsAction,
  LoadMessagesByIdRejectAction,
  LoadMessagesByIdStatusAction,
  LoadThreadsRejectAction,
  MarkThreadAsReadAction,
  MessageIdsInThreadMap,
  MessageMap,
  MessagesState,
  ResultState,
  SetMessagesAction,
  SetThreadsAction,
  ThreadMap,
  ToggleThreadReadStatusAction,
  VisibilityFilter,
} from "App/messages/reducers/messages.interface"
import { MessagesEvent } from "App/messages/constants"

export const initialState: MessagesState = {
  threadMap: {},
  messageMap: {},
  messageIdsInThreadMap: {},
  searchValue: "",
  resultState: ResultState.Empty,
  visibilityFilter: VisibilityFilter.All,
  messagesResultStateMap: {},
}

export const messagesReducer = createReducer<MessagesState>(
  initialState,
  (builder) => {
    builder
      .addCase(pendingAction(MessagesEvent.LoadThreads), (state) => {
        return {
          ...state,
          resultState: ResultState.Loading,
        }
      })
      .addCase(fulfilledAction(MessagesEvent.LoadThreads), (state) => {
        return {
          ...state,
          resultState: ResultState.Loaded,
          error: null,
        }
      })
      .addCase(
        rejectedAction(MessagesEvent.LoadThreads),
        (state, action: LoadThreadsRejectAction) => {
          return {
            ...state,
            resultState: ResultState.Error,
            error: action.payload,
          }
        }
      )

      .addCase<string, LoadMessagesByIdStatusAction>(
        pendingAction(MessagesEvent.LoadMessagesById),
        (state, action) => {
          const threadId = action.meta.arg
          return {
            ...state,
            messagesResultStateMap: {
              ...state.messagesResultStateMap,
              [threadId]: ResultState.Loading,
            },
          }
        }
      )
      .addCase<string, LoadMessagesByIdStatusAction>(
        fulfilledAction(MessagesEvent.LoadMessagesById),
        (state, action) => {
          const threadId = action.meta.arg
          return {
            ...state,
            messagesResultStateMap: {
              ...state.messagesResultStateMap,
              [threadId]: ResultState.Loaded,
            },
          }
        }
      )
      .addCase<string, LoadMessagesByIdRejectAction>(
        rejectedAction(MessagesEvent.LoadMessagesById),
        (state, action) => {
          const threadId = action.meta.arg
          return {
            ...state,
            messagesResultStateMap: {
              ...state.messagesResultStateMap,
              [threadId]: ResultState.Error,
            },
            error: action.payload,
          }
        }
      )

      .addCase(MessagesEvent.SetThreads, (state, action: SetThreadsAction) => {
        const threads = action.payload
        return {
          ...state,
          threadMap: threads.reduce((prevThreadMap, thread) => {
            prevThreadMap[thread.id] = thread
            return prevThreadMap
          }, {} as ThreadMap),
        }
      })

      .addCase(
        MessagesEvent.SetMessages,
        (state, action: SetMessagesAction) => {
          const messages = action.payload
          return {
            ...state,
            messageMap: messages.reduce(
              (prevMessageMap: MessageMap, message) => {
                prevMessageMap[message.id] = message
                return prevMessageMap
              },
              {}
            ),
            messageIdsInThreadMap: messages.reduce(
              (prev: MessageIdsInThreadMap, message) => {
                const messageIds = prev[message.threadId] ?? []
                prev[message.threadId] = messageIds.find(
                  (id) => id === message.id
                )
                  ? messageIds
                  : [...messageIds, message.id]

                return prev
              },
              {}
            ),
          }
        }
      )

      .addCase(
        MessagesEvent.ToggleThreadReadStatus,
        (state, action: ToggleThreadReadStatusAction) => {
          const ids = action.payload
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
            { ...state.threadMap }
          )

          return { ...state, threadMap }
        }
      )

      .addCase(
        MessagesEvent.MarkThreadAsRead,
        (state, action: MarkThreadAsReadAction) => {
          const ids = action.payload
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
            { ...state.threadMap }
          )

          return { ...state, threadMap }
        }
      )

      .addCase(
        MessagesEvent.DeleteThreads,
        (state, action: DeleteThreadsAction) => {
          const ids = action.payload
          const threadMap = { ...state.threadMap }
          const messageIdsInThreadMap = { ...state.messageIdsInThreadMap }

          ids.forEach((id) => {
            delete threadMap[id]
            delete messageIdsInThreadMap[id]
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
            messageMap,
            threadMap,
            messageIdsInThreadMap,
          }
        }
      )

      .addCase(
        MessagesEvent.ChangeVisibilityFilter,
        (state, action: ChangeVisibilityFilterAction) => {
          const visibilityFilter = action.payload
          return { ...state, visibilityFilter }
        }
      )

      .addCase(
        MessagesEvent.ChangeSearchValue,
        (state, action: ChangeSearchValueAction) => {
          const searchValue = action.payload
          return { ...state, searchValue }
        }
      )

      .addCase(MessagesEvent.DevClearAllThreads, (state) => {
        return {
          ...state,
          threadMap: {},
          messageMap: {},
          messageIdsInThreadMap: {},
        }
      })
  }
)
