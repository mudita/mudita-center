/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { BackupError, BackupEvent } from "Core/backup/constants"
import { RestoreBackup } from "Core/backup/dto"
import { restoreBackupRequest } from "Core/backup/requests"
import { AppError } from "Core/core/errors"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { PureDeviceData } from "Core/device/reducers/device.interface"

export const startRestoreDevice = createAsyncThunk<
  undefined,
  RestoreBackup,
  { state: ReduxRootState }
>(
  BackupEvent.RestoreBackup,
  async ({ key, backup }, { getState, rejectWithValue }) => {
    const state = getState()
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
