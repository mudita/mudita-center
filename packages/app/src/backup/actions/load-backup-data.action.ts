/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { setBackupData } from "App/backup/actions/base.action"
import { BackupError, BackupEvent } from "App/backup/constants"
import { AppError } from "App/core/errors"
import { loadBackupsRequest } from "App/backup/requests/load-backups.request"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

export const loadBackupData = createAsyncThunk(
  BackupEvent.Load,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState & ReduxRootState

    const pureOsBackupDesktopLocation = state.settings.osBackupLocation

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

    const response = await loadBackupsRequest(pureOsBackupDesktopLocation)

    if (!response.ok) {
      return rejectWithValue(
        new AppError(BackupError.Load, "Get Backups Data request failed")
      )
    }

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(setBackupData(response.data!))

    return
  }
)
