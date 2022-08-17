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

export const setUploadingFileLength = createAction<number>(
  FilesManagerEvent.SetUploadingFileLength
)
