/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { setBackupData } from "App/backup/actions/base.action"
import { BackupError, BackupEvent } from "App/backup/constants"
import { AppError } from "App/core/errors"
import { isResponsesSuccessWithData } from "App/core/helpers"
import getFileData from "App/__deprecated__/renderer/requests/get-file-data"
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
        new AppError(
          BackupError.Load,
          "Pure OS Backup Desktop Location is undefined"
        )
      )
    }

    const response = await getFileData({
      filePath: pureOsBackupDesktopLocation,
    })

    if (!isResponsesSuccessWithData([response])) {
      return rejectWithValue(
        new AppError(BackupError.Load, "Get Backups Data request failed")
      )
    }

    dispatch(setBackupData(response.data!))

    return
  }
)
