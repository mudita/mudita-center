/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { FilesManagerEvent } from "Core/files-manager/constants"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import getFilesByActiveSoundAppSelector from "Core/files-manager/selectors/get-files-by-active-sound-app.selector"

export const selectAllItems = createAsyncThunk<
  string[],
  undefined,
  { state: ReduxRootState }
>(FilesManagerEvent.SelectAllItems, async (_, { getState }) => {
  const files = getFilesByActiveSoundAppSelector(getState())
  return files.map(({ id }) => id)
})

export const toggleItem = createAsyncThunk<
  string[],
  string,
  { state: ReduxRootState }
>(FilesManagerEvent.ToggleItem, async (payload, { getState }) => {
  const state = getState()
  const selectedItems = state.filesManager.selectedItems.rows

  if (selectedItems.includes(payload)) {
    return selectedItems.filter((item) => item !== payload)
  } else {
    return [...selectedItems, payload]
  }
})

export const resetAllItems = createAction(FilesManagerEvent.ResetAllItems)
