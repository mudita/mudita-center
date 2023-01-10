/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { BackupError, BackupEvent } from "App/backup/constants"
import { RestoreBackup } from "App/backup/dto"
import { restoreBackupRequest } from "App/backup/requests"
import { AppError } from "App/core/errors"
import { PureDeviceData } from "App/device"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

export const startRestoreDevice = createAsyncThunk<undefined, RestoreBackup>(
  BackupEvent.RestoreBackup,
  async ({ key, backup }, { getState, rejectWithValue }) => {
    const state = getState() as RootState & ReduxRootState
    const osBackupFilePath = (state.device.data as PureDeviceData | undefined)
      ?.backupFilePath

    if (osBackupFilePath === undefined || osBackupFilePath === "") {
      return rejectWithValue(
        new AppError(
          BackupError.BackupLocationIsUndefined,
          "Pure OS Backup Pure Location is undefined"
        )
      )
    }

    const result = await restoreBackupRequest({
      token: key,
      filePath: backup.filePath,
      backupFilePath: osBackupFilePath,
    })

    if (!result.ok) {
      return rejectWithValue(result.error)
    }

    return
  }
)
