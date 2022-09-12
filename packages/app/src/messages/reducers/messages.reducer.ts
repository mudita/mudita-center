/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// TODO: CP-1494, CP-1495

import { createReducer } from "@reduxjs/toolkit"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"
import {
  ResendMessageFulfilledAction,
  ResendMessageRejectedAction,
  AddNewMessageAction,
  ChangeSearchValueAction,
  DeleteThreadsAction,
  MessageIdsInThreadMap,
  MessageMap,
  MessagesState,
  ThreadMap,
  MarkThreadsReadStatusPendingAction,
  ToggleThreadsReadStatusPendingAction,
  MarkThreadsReadStatusAction,
  DeleteMessageAction,
  DeleteMessagePendingAction,
  DeleteMessageRejectedAction,
  SearchMessagesAction,
} from "App/messages/reducers/messages.interface"
import {
  MessagesEvent,
  ResultState,
  VisibilityFilter,
} from "App/messages/constants"
import {
  selectAllItems,
  resetItems,
  toggleItem,
  deleteThreads,
} from "App/messages/actions"
import { DataSyncEvent } from "App/data-sync/constants"
import { ReadAllIndexesAction } from "App/data-sync/reducers"
import { markThreadsReadStatus } from "App/messages/reducers/messages-reducer.helpers"
import { changeLocation } from "App/core/actions"
import assert from "assert"
import { SearchEvent } from "App/search/constants"
import { State } from "App/core/constants"
import { AppError } from "App/core/errors"

export const initialState: MessagesState = {
  threadMap: {},
  messageMap: {},
  messageIdsInThreadMap: {},
  searchValue: "",
  threadsState: ResultState.Empty,
  visibilityFilter: VisibilityFilter.All,
  messagesStateMap: {},
  error: null,
  currentlyDeletingMessageId: null,
  selectedItems: { rows: [] },
  searchResult: {},
  state: State.Initial,
}

export const messagesReducer = createReducer<MessagesState>(
  initialState,
  (builder) => {
    builder
      .addCase(
        fulfilledAction(MessagesEvent.AddNewMessage),
        (state, action: AddNewMessageAction) => {
          const messageParts = action.payload.messageParts
          const prevMessageMap = { ...state.messageMap }
          const prevMessageIdsInThreadMap = { ...state.messageIdsInThreadMap }
          const prevThreadMap: ThreadMap = { ...state.threadMap }

          for (const { message, thread } of messageParts) {
            prevMessageMap[message.id] = message

            const messageIds: string[] =
              prevMessageIdsInThreadMap[message.threadId] ?? []
            prevMessageIdsInThreadMap[message.threadId] = messageIds.find(
              (id) => id === message.id
            )
              ? messageIds
              : [...messageIds, message.id]

            if (thread) {
              prevThreadMap[thread.id] = thread
            }
          }

          return {
            ...state,
            messageMap: prevMessageMap,
            messageIdsInThreadMap: prevMessageIdsInThreadMap,
            threadMap: prevThreadMap,
          }
        }
      )

      .addCase(
        pendingAction(MessagesEvent.DeleteMessage),
        (state, action: DeleteMessagePendingAction) => {
          const deletedMessageId = action.meta.arg
          return {
            ...state,
            currentlyDeletingMessageId: deletedMessageId,
            state: State.Loading,
          }
        }
      )

      .addCase(
        fulfilledAction(MessagesEvent.DeleteMessage),
        (state, action: DeleteMessageAction) => {
          const deletedMessageId = action.payload
          const newMessagesMap = { ...state.messageMap }
          const newThreadMap = {
            ...state.threadMap,
          }
          const newMessageIdsInThreadMap = {
            ...state.messageIdsInThreadMap,
          }
          const threadId = Object.keys(state.messageIdsInThreadMap).find(
            (thread) => {
              return state.messageIdsInThreadMap[thread].find((messageId) => {
                return messageId === deletedMessageId
              })
            }
          )

          assert(threadId)

          const filteredAffectedThreadMessages = state.messageIdsInThreadMap[
            threadId
          ].filter((messageId) => messageId !== deletedMessageId)

          if (filteredAffectedThreadMessages.length === 0) {
            delete newMessageIdsInThreadMap[threadId]
            delete newThreadMap[threadId]
          } else {
            newMessageIdsInThreadMap[threadId] = filteredAffectedThreadMessages
          }

          delete newMessagesMap[deletedMessageId]

          return {
            ...state,
            messageMap: newMessagesMap,
            threadMap: newThreadMap,
            messageIdsInThreadMap: newMessageIdsInThreadMap,
            currentlyDeletingMessageId: null,
            state: State.Loaded,
          }
        }
      )

      .addCase(
        rejectedAction(MessagesEvent.DeleteMessage),
        (state, action: DeleteMessageRejectedAction) => {
          return {
            ...state,
            error: action.payload as AppError,
            currentlyDeletingMessageId: null,
            state: State.Failed,
          }
        }
      )

      .addCase(
        fulfilledAction(MessagesEvent.ResendMessage),
        (state, action: ResendMessageFulfilledAction) => {
          const messageParts = action.payload.messageParts
          const prevMessageMap = { ...state.messageMap }
          const prevMessageIdsInThreadMap = { ...state.messageIdsInThreadMap }
          const prevThreadMap: ThreadMap = { ...state.threadMap }

          for (const { message, thread } of messageParts) {
            prevMessageMap[message.id] = message

            const messageIds: string[] =
              prevMessageIdsInThreadMap[message.threadId] ?? []
            prevMessageIdsInThreadMap[message.threadId] = messageIds.find(
              (id) => id === message.id
            )
              ? messageIds
              : [...messageIds, message.id]

            if (thread) {
              prevThreadMap[thread.id] = thread
            }
          }

          return {
            ...state,
            messageMap: prevMessageMap,
            messageIdsInThreadMap: prevMessageIdsInThreadMap,
            threadMap: prevThreadMap,
          }
        }
      )

      .addCase(
        rejectedAction(MessagesEvent.ResendMessage),
        (state, action: ResendMessageRejectedAction) => {
          return {
            ...state,
            error: action.payload as AppError,
            state: State.Failed,
          }
        }
      )

      .addCase(
        pendingAction(MessagesEvent.ToggleThreadsReadStatus),
        (state, action: ToggleThreadsReadStatusPendingAction) => {
          const threads = action.meta.arg
          const ids = threads.map((thread) => thread.id)
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
        pendingAction(MessagesEvent.MarkThreadsReadStatus),
        (state, action: MarkThreadsReadStatusPendingAction) => {
          const threads = action.meta.arg
          const threadMap = markThreadsReadStatus(threads, state.threadMap)
          return { ...state, threadMap }
        }
      )
      .addCase(
        fulfilledAction(MessagesEvent.MarkThreadsReadStatus),
        (state, action: MarkThreadsReadStatusAction) => {
          const threads = action.meta.arg
          const threadMap = markThreadsReadStatus(threads, state.threadMap)
          return { ...state, threadMap }
        }
      )

      .addCase(
        fulfilledAction(MessagesEvent.DeleteThreads),
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
            state: State.Loaded,
          }
        }
      )

      .addCase(pendingAction(MessagesEvent.DeleteThreads), (state) => {
        return {
          ...state,
          state: State.Loading,
        }
      })

      .addCase(deleteThreads.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload as AppError,
          state: State.Failed,
        }
      })

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
        fulfilledAction(DataSyncEvent.ReadAllIndexes),
        (state, action: ReadAllIndexesAction) => {
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
            threadsState: ResultState.Loaded,
          }
        }
      )

      .addCase(selectAllItems.fulfilled, (state, action) => {
        return {
          ...state,
          selectedItems: { rows: action.payload },
        }
      })
      .addCase(resetItems, (state) => {
        return { ...state, selectedItems: { rows: [] } }
      })
      .addCase(toggleItem.fulfilled, (state, action) => {
        return {
          ...state,
          selectedItems: { rows: action.payload },
        }
      })
      .addCase(changeLocation, (state) => {
        return { ...state, selectedItems: { rows: [] } }
      })
      .addCase(
        fulfilledAction(SearchEvent.SearchData),
        (state, action: SearchMessagesAction) => {
          return { ...state, searchResult: action.payload }
        }
      )
  }
)
