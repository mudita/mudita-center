/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { State } from "App/core/constants/state.constant"
import { FilesManagerEvent } from "App/files-manager/constants"
import {
  setPendingFilesToUpload,
  setUploadingState,
} from "App/files-manager/actions/base.action"

export const abortPendingUpload = createAsyncThunk(
  FilesManagerEvent.AbortPendingUpload,
  async (_, { dispatch }) => {
    dispatch(setPendingFilesToUpload([]))
    dispatch(setUploadingState(State.Loaded))
  }
)
