/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

const toggleItemSelect = (
  selectedItems: { rows: string[] },
  id: string
): string[] => {
  let threadIds = [...selectedItems.rows]
  if (threadIds.includes(id)) {
    threadIds = threadIds.filter((item) => item !== id)
    return threadIds
  } else {
    return [...threadIds, id]
  }
}

export const selectAllItems = createAsyncThunk<string[]>(
  MessagesEvent.SelectAll,
  async (_, { getState }) => {
    const state = getState() as RootState & ReduxRootState

    const threadIds = Object.keys(state.messages.threadMap)

    return threadIds
  }
)

export const resetItems = createAction(MessagesEvent.ResetItems)

export const toggleItem = createAsyncThunk<string[], string>(
  MessagesEvent.ToggleItem,
  async (id, { getState }) => {
    const state = getState() as RootState & ReduxRootState

    const threadIds = toggleItemSelect(state.messages.selectedItems, id)

    return threadIds
  }
)
