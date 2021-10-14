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
  LoadThreadsRejectAction,
  MarkThreadAsReadAction,
  MessagesState,
  ResultState,
  ToggleThreadReadStatusAction,
  VisibilityFilter,
} from "App/messages/reducers/messages.interface"
import { MessagesEvent } from "App/messages/constants"
import { LoadBackupDataRejectAction } from "App/backup/reducers"

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
        }
      })
      .addCase(fulfilledAction(MessagesEvent.LoadThreads), (state) => {
        return {
          ...state,
        }
      })
      .addCase(
        rejectedAction(MessagesEvent.LoadThreads),
        (state, action: LoadThreadsRejectAction) => {
          return {
            ...state,
          }
        }
      )

      .addCase(pendingAction(MessagesEvent.LoadMessagesById), (state) => {
        return {
          ...state,
        }
      })
      .addCase(fulfilledAction(MessagesEvent.LoadMessagesById), (state) => {
        return {
          ...state,
        }
      })
      .addCase(
        rejectedAction(MessagesEvent.LoadMessagesById),
        (state, action: LoadBackupDataRejectAction) => {
          return {
            ...state,
          }
        }
      )

      .addCase(
        MessagesEvent.ToggleThreadReadStatus,
        (state, action: ToggleThreadReadStatusAction) => {
          return {
            ...state,
          }
        }
      )

      .addCase(
        MessagesEvent.MarkThreadAsRead,
        (state, action: MarkThreadAsReadAction) => {
          return {
            ...state,
          }
        }
      )

      .addCase(
        MessagesEvent.DeleteThreads,
        (state, action: DeleteThreadsAction) => {
          return {
            ...state,
          }
        }
      )

      .addCase(
        MessagesEvent.ChangeVisibilityFilter,
        (state, action: ChangeVisibilityFilterAction) => {
          return {
            ...state,
          }
        }
      )

      .addCase(
        MessagesEvent.ChangeSearchValue,
        (state, action: ChangeSearchValueAction) => {
          return {
            ...state,
          }
        }
      )
  }
)
