/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { State } from "Core/core/constants/state.constant"
import { FilesManagerEvent } from "Core/files-manager/constants"
import {
  setPendingFilesToUpload,
  setUploadingState,
} from "Core/files-manager/actions/base.action"

export const abortPendingUpload = createAsyncThunk(
  FilesManagerEvent.AbortPendingUpload,
  (_, { dispatch }) => {
    dispatch(setPendingFilesToUpload([]))
    dispatch(setUploadingState(State.Initial))
  }
)
