/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

export const selectAllItems = createAsyncThunk<string[]>(
  MessagesEvent.SelectAll,
  async (_, { getState }) => {
    const state = getState() as RootState & ReduxRootState

    const threadIds = Object.keys(state.messages.threadMap)

    return threadIds
  }
)

export const resetItems = createAction(MessagesEvent.ResetItems)

export const toggleItem = createAction<string>(MessagesEvent.ToggleItem)
