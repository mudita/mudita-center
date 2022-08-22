/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { FilesManagerEvent } from "App/files-manager/constants"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

export const selectAllItems = createAsyncThunk<string[]>(
  FilesManagerEvent.SelectAllItems,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (_, { getState }) => {
    const state = getState() as RootState & ReduxRootState
    const fileIds = state.filesManager.files.map((file) => file.id)

    return fileIds
  }
)

export const toggleItem = createAsyncThunk<string[], string>(
  FilesManagerEvent.ToggleItem,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (payload, { getState }) => {
    const state = getState() as RootState & ReduxRootState
    const selectedItems = state.filesManager.selectedItems.rows

    if (selectedItems.includes(payload)) {
      return selectedItems.filter((item) => item !== payload)
    } else {
      return [...selectedItems, payload]
    }
  }
)

export const resetAllItems = createAction(FilesManagerEvent.ResetAllItems)
