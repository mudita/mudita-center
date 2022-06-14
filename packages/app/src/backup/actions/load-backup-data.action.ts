/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { BackupEvent } from "App/backup/constants"
import getFileData from "App/__deprecated__/renderer/requests/get-file-data"
import { LoadBackupDataError } from "App/backup/errors"
import { setBackupData } from "App/backup/actions/base.action"
import { isResponsesSuccessWithData } from "App/core/helpers"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

export const loadBackupData = createAsyncThunk(
  BackupEvent.Load,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState & ReduxRootState

    const pureOsBackupDesktopLocation = state.settings.pureOsBackupLocation

    if (
      pureOsBackupDesktopLocation === undefined ||
      pureOsBackupDesktopLocation === ""
    ) {
      return rejectWithValue(
        new LoadBackupDataError("Pure OS Backup Desktop Location is undefined")
      )
    }

    const response = await getFileData({
      filePath: pureOsBackupDesktopLocation,
    })

    if (!isResponsesSuccessWithData([response])) {
      return rejectWithValue(
        new LoadBackupDataError("Get Backups Data request failed")
      )
    }

    dispatch(setBackupData(response.data!))

    return
  }
)
