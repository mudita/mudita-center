/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { FilesManagerEvent } from "App/files-manager/constants"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers"
import {
  FilesManagerState,
  ResultState,
  SetFilesAction,
  GetFilesRejectAction,
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
      .addCase(pendingAction(FilesManagerEvent.GetFiles), (state) => {
        return {
          ...state,
          resultState: ResultState.Loading,
        }
      })
      .addCase(fulfilledAction(FilesManagerEvent.GetFiles), (state) => {
        return {
          ...state,
          resultState: ResultState.Loaded,
          error: null,
        }
      })
      .addCase(
        rejectedAction(FilesManagerEvent.GetFiles),
        (state, action: GetFilesRejectAction) => {
          return {
            ...state,
            resultState: ResultState.Error,
            error: action.payload,
          }
        }
      )
      .addCase(
        rejectedAction(FilesManagerEvent.SetFiles),
        (state, action: SetFilesAction) => {
          const files = action.payload
          return {
            ...state,
            files: files,
          }
        }
      )
  }
)
