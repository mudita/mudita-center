/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { State } from "Core/core/constants"
import { AppError } from "Core/core/errors"
import {
  getFiles,
  resetAllItems,
  resetDeletingState,
  resetUploadingState,
  selectAllItems,
  setUploadingFileCount,
  setUploadingState,
  toggleItem,
  uploadFile,
  setUploadBlocked,
  setDeletingFileCount,
  setDuplicatedFiles,
  resetUploadingStateAfterSuccess,
  resetFiles,
  setInvalidFiles,
  setInitialFilesManagerState,
  setActiveSoundApp,
} from "Core/files-manager/actions"
import { changeLocation } from "Core/core/actions"
import { FilesManagerState } from "Core/files-manager/reducers/files-manager.interface"
import { deleteFiles } from "Core/files-manager/actions/delete-files.action"

export const initialState: FilesManagerState = {
  filesMap: {},
  activeSoundApp: "UNKNOWN",
  loading: State.Initial,
  uploading: State.Initial,
  deleting: State.Initial,
  uploadingFileCount: 0,
  deletingFileCount: 0,
  selectedItems: {
    rows: [],
  },
  uploadBlocked: false,
  error: null,
  duplicatedFiles: [],
  invalidFiles: [],
}

export const filesManagerReducer = createReducer<FilesManagerState>(
  initialState,
  (builder) => {
    builder
      .addCase(setInitialFilesManagerState, () => {
        return { ...initialState }
      })
      .addCase(getFiles.pending, (state) => {
        return {
          ...state,
          loading: State.Loading,
          error: null,
        }
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        return {
          ...state,
          loading: State.Loaded,
          filesMap: action.payload,
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
      .addCase(setUploadBlocked, (state, action) => {
        return {
          ...state,
          uploadBlocked: action.payload,
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
      .addCase(changeLocation, () => {
        return { ...initialState }
      })
      .addCase(deleteFiles.pending, (state) => {
        return {
          ...state,
          deleting: State.Loading,
        }
      })
      .addCase(deleteFiles.fulfilled, (state, action) => {
        const ids = action.payload
        const filesMap = { ...state.filesMap }
        const files = filesMap[state.activeSoundApp] ?? []
        filesMap[state.activeSoundApp] = files.filter(
          (file) => !ids.some((id) => id === file.id)
        )
        return {
          ...state,
          filesMap,
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
          deletingFileCount: 0,
        }
      })
      .addCase(resetUploadingState, (state) => {
        return {
          ...state,
          uploading: State.Initial,
          error: null,
          uploadingFileCount: 0,
          uploadBlocked: false,
          duplicatedFiles: [],
          invalidFiles: [],
        }
      })
      .addCase(resetUploadingStateAfterSuccess, (state) => {
        return {
          ...state,
          uploading: State.Initial,
          uploadingFileCount: 0,
        }
      })
      .addCase(setUploadingFileCount, (state, action) => {
        return {
          ...state,
          uploadingFileCount: action.payload,
        }
      })
      .addCase(setDeletingFileCount, (state, action) => {
        return {
          ...state,
          deletingFileCount: action.payload,
        }
      })
      .addCase(setDuplicatedFiles, (state, action) => {
        state.duplicatedFiles = action.payload
      })
      .addCase(setInvalidFiles, (state, action) => {
        state.invalidFiles = action.payload
      })
      .addCase(resetFiles, (state, _) => {
        state.filesMap = {}
      })
      .addCase(setActiveSoundApp, (state, action) => {
        state.activeSoundApp = action.payload
      })
  }
)
