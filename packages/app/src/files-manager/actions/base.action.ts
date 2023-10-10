/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { FilesManagerEvent } from "App/files-manager/constants"

export const setUploadingState = createAction<State>(
  FilesManagerEvent.SetUploadingState
)

export const resetDeletingState = createAction(
  FilesManagerEvent.ResetDeletingState
)

export const resetUploadingState = createAction(
  FilesManagerEvent.ResetUploadingState
)

export const resetUploadingStateAfterSuccess = createAction(
  FilesManagerEvent.ResetUploadingStateAfterSuccess
)

export const setUploadingFileCount = createAction<number>(
  FilesManagerEvent.SetUploadingFileCount
)

export const setUploadBlocked = createAction<boolean>(
  FilesManagerEvent.SetUploadBlocked
)

export const setDeletingFileCount = createAction<number>(
  FilesManagerEvent.SetDeletingFileCount
)

export const setPendingFilesToUpload = createAction<string[]>(
  FilesManagerEvent.SetPendingFilesToUpload
)

export const setDuplicatedFiles = createAction<string[]>(
  FilesManagerEvent.SetDuplicatedFiles
)
export const resetFiles = createAction(FilesManagerEvent.ResetFiles)

export const setInvalidFiles = createAction<string[]>(
  FilesManagerEvent.SetInvalidFiles
)
