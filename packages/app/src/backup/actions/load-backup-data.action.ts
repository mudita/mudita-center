/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { BackupEvent } from "App/backup/constants"
import getFileData from "Renderer/requests/get-file-data"
import { LoadBackupDataError } from "App/backup/errors"
import { setBackupData } from "App/backup/actions/base.action"
import { isResponsesSuccessWithData } from "Renderer/utils/is-responses-success-with-data.helpers"
import { ReduxRootState, RootState } from "Renderer/store"

export const loadBackupData = createAsyncThunk(
  BackupEvent.Load,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState & ReduxRootState

    const pureOsBackupLocation = state.settings.pureOsBackupLocation

    if (pureOsBackupLocation === undefined || pureOsBackupLocation === "") {
      return rejectWithValue(
        new LoadBackupDataError("Pure OS Backup Location is undefined")
      )
    }

    const response = await getFileData({ filePath: pureOsBackupLocation })

    if (!isResponsesSuccessWithData([response])) {
      return rejectWithValue(
        new LoadBackupDataError("Get Backups Data request failed")
      )
    }

    dispatch(setBackupData(response.data!))

    return
  }
)
