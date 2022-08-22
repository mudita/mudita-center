/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import {
  getFiles,
  resetAllItems,
  resetDeletingState,
  resetUploadingState,
  selectAllItems, setUploadingFileLength,
  setUploadingState,
  toggleItem,
  uploadFile,
} from "App/files-manager/actions"
import { changeLocation } from "App/core/actions"
import { FilesManagerState } from "App/files-manager/reducers/files-manager.interface"
import { deleteFiles } from "App/files-manager/actions/delete-files.action"

export const initialState: FilesManagerState = {
  files: [],
  loading: State.Initial,
  uploading: State.Initial,
  deleting: State.Initial,
  uploadingFileLength: 0,
  selectedItems: {
    rows: [],
  },
  error: null,
}

export const filesManagerReducer = createReducer<FilesManagerState>(
  initialState,
  (builder) => {
    builder
      .addCase(getFiles.pending, (state) => {
        return {
          ...state,
          loading: State.Loading,
        }
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        return {
          ...state,
          loading: State.Loaded,
          files: action.payload,
          error: null,
        }
      })
      .addCase(getFiles.rejected, (state, action) => {
        return {
          ...state,
          loading: State.Failed,
          error: action.payload as AppError,
        }
      })

      .addCase(setUploadingState, (state, action) => {
        return {
          ...state,
          uploading: action.payload,
        }
      })
      .addCase(uploadFile.rejected, (state, action) => {
        return {
          ...state,
          uploading: State.Failed,
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
      .addCase(deleteFiles.pending, (state) => {
        return {
          ...state,
          deleting: State.Loading,
        }
      })
      .addCase(deleteFiles.fulfilled, (state, action) => {
        return {
          ...state,
          files: [...state.files].filter(
            (file) => !action.payload.some((id) => id === file.id)
          ),
          deleting: State.Loaded,
          error: null,
        }
      })
      .addCase(deleteFiles.rejected, (state, action) => {
        return {
          ...state,
          deleting: State.Failed,
          error: action.payload as AppError,
        }
      })
      .addCase(resetDeletingState, (state) => {
        return {
          ...state,
          deleting: State.Initial,
          error: null,
        }
      })
      .addCase(resetUploadingState, (state) => {
        return {
          ...state,
          uploading: State.Initial,
          error: null,
          uploadingFileLength: 0,
        }
      })
      .addCase(setUploadingFileLength, (state, action) => {
        return {
          ...state,
          uploadingFileLength: action.payload
        }
      })
  }
)
