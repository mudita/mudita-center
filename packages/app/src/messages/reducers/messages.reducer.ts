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
  SetThreadsTotalCountAction,
  ThreadMap,
  ToggleThreadReadStatusAction,
  VisibilityFilter,
} from "App/messages/reducers/messages.interface"
import { MessagesEvent } from "App/messages/constants"
import { DataSyncEvent } from "App/data-sync/constants"
import { UpdateAllIndexesAction } from "App/data-sync/reducers"

export const initialState: MessagesState = {
  threadMap: {},
  messageMap: {},
  messageIdsInThreadMap: {},
  searchValue: "",
  threadsTotalCount: 0,
  threadsState: ResultState.Empty,
  visibilityFilter: VisibilityFilter.All,
  messagesStateMap: {},
  error: null,
}

export const messagesReducer = createReducer<MessagesState>(
  initialState,
  (builder) => {
    builder
      .addCase(pendingAction(MessagesEvent.LoadThreads), (state) => {
        return {
          ...state,
          threadsState: ResultState.Loading,
        }
      })
      .addCase(fulfilledAction(MessagesEvent.LoadThreads), (state) => {
        return {
          ...state,
          threadsState: ResultState.Loaded,
          error: null,
        }
      })
      .addCase(
        rejectedAction(MessagesEvent.LoadThreads),
        (state, action: LoadThreadsRejectAction) => {
          return {
            ...state,
            threadsState: ResultState.Error,
            error: action.payload,
          }
        }
      )

      .addCase<string, LoadMessagesByIdStatusAction>(
        pendingAction(MessagesEvent.LoadMessagesById),
        (state, action) => {
          const { threadId } = action.meta.arg
          return {
            ...state,
            messagesStateMap: {
              ...state.messagesStateMap,
              [threadId]: ResultState.Loading,
            },
          }
        }
      )
      .addCase<string, LoadMessagesByIdStatusAction>(
        fulfilledAction(MessagesEvent.LoadMessagesById),
        (state, action) => {
          const { threadId } = action.meta.arg
          return {
            ...state,
            messagesStateMap: {
              ...state.messagesStateMap,
              [threadId]: ResultState.Loaded,
            },
          }
        }
      )
      .addCase<string, LoadMessagesByIdRejectAction>(
        rejectedAction(MessagesEvent.LoadMessagesById),
        (state, action) => {
          const { threadId } = action.meta.arg
          return {
            ...state,
            messagesStateMap: {
              ...state.messagesStateMap,
              [threadId]: ResultState.Error,
            },
            error: action.payload,
          }
        }
      )

      .addCase(MessagesEvent.SetThreads, (state, action: SetThreadsAction) => {
        const threads = action.payload
        const threadMap: ThreadMap = { ...state.threadMap }
        return {
          ...state,
          threadMap: threads.reduce((prevThreadMap, thread) => {
            prevThreadMap[thread.id] = thread
            return prevThreadMap
          }, threadMap),
        }
      })

      .addCase(
        MessagesEvent.SetThreadsTotalCount,
        (state, action: SetThreadsTotalCountAction) => {
          return {
            ...state,
            threadsTotalCount: action.payload,
          }
        }
      )

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
              { ...state.messageMap }
            ),
            messageIdsInThreadMap: messages.reduce(
              (prev: MessageIdsInThreadMap, message) => {
                const messageIds: string[] = prev[message.threadId] ?? []
                prev[message.threadId] = messageIds.find(
                  (id) => id === message.id
                )
                  ? messageIds
                  : [...messageIds, message.id]

                return prev
              },
              { ...state.messageIdsInThreadMap }
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

      .addCase(MessagesEvent.ClearAllThreads, (state) => {
        return {
          ...state,
          threadMap: {},
          messageMap: {},
          messageIdsInThreadMap: {},
        }
      })

      .addCase(
        fulfilledAction(DataSyncEvent.UpdateAllIndexes),
        (state, action: UpdateAllIndexesAction) => {
          return {
            ...state,
            threadMap: action.payload.threads,
            messageMap: action.payload.messages,
            messageIdsInThreadMap: Object.keys(action.payload.messages)
              .map((messageKey) => {
                return action.payload.messages[messageKey]
              })
              .reduce((prev: MessageIdsInThreadMap, message) => {
                const messageIds: string[] = prev[message.threadId] ?? []
                prev[message.threadId] = messageIds.find(
                  (id) => id === message.id
                )
                  ? messageIds
                  : [...messageIds, message.id]

                return prev
              }, {}),
            threadsTotalCount: Object.keys(action.payload.threads).length,
            threadsState: ResultState.Loaded,
          }
        }
      )
  }
)
