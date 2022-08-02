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

export const initialState: FilesManagerState = {
  resultState: ResultState.Empty,
  files: [],
  error: null,
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
  }
)
