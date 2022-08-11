/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { getFiles } from "App/files-manager/actions"
import { AppError } from "App/core/errors"
import {
  FilesManagerState,
  ResultState,
} from "App/files-manager/reducers/files-manager.interface"
import {
  selectAllItems,
  resetAllItems,
  toggleItem,
} from "App/files-manager/actions"
import { changeLocation } from "App/core/actions"

export const initialState: FilesManagerState = {
  resultState: ResultState.Empty,
  files: [],
  error: null,
  selectedItems: {
    rows: [],
  },
}

export const filesManagerReducer = createReducer<FilesManagerState>(
  initialState,
  (builder) => {
    builder
      .addCase(getFiles.pending, (state) => {
        return {
          ...state,
          resultState: ResultState.Loading,
        }
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        return {
          ...state,
          resultState: ResultState.Loaded,
          files: action.payload,
          error: null,
        }
      })
      .addCase(getFiles.rejected, (state, action) => {
        return {
          ...state,
          resultState: ResultState.Error,
          error: action.payload as AppError,
        }
      })
      .addCase(selectAllItems.fulfilled, (state, action) => {
        return {
          ...state,
          selectedItems: {
            ...state.selectedItems,
            rows: action.payload,
          },
        }
      })
      .addCase(toggleItem.fulfilled, (state, action) => {
        return {
          ...state,
          selectedItems: {
            ...state.selectedItems,
            rows: action.payload,
          },
        }
      })
      .addCase(resetAllItems, (state) => {
        return {
          ...state,
          selectedItems: {
            ...state.selectedItems,
            rows: [],
          },
        }
      })
      .addCase(changeLocation, (state) => {
        return { ...state, selectedItems: { rows: [] } }
      })
  }
)
