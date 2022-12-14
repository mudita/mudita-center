/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { BackupEvent, BackupError } from "App/backup/constants"
import { CreateBackup } from "App/backup/dto"
import { createBackupRequest } from "App/backup/requests/create-backup.request"
import { loadBackupData } from "App/backup/actions/load-backup-data.action"
import { AppError } from "App/core/errors"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

export const startBackupDevice = createAsyncThunk<undefined, CreateBackup>(
  BackupEvent.CreateBackup,
  async ({ key }, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState & ReduxRootState
    const pureOsBackupDesktopFileDir = state.settings.osBackupLocation

    if (
      pureOsBackupDesktopFileDir === undefined ||
      pureOsBackupDesktopFileDir === ""
    ) {
      return rejectWithValue(
        new AppError(
          BackupError.BackupLocationIsUndefined,
          "Pure OS Backup Desktop Location is undefined"
        )
      )
    }

    const fileBase = `${new Date()
      .toISOString()
      .replace(/\./g, "")
      .replace(/-/g, "")
      .replace(/:/g, "")}`

    const downloadDeviceBackupResponse = await createBackupRequest({
      key,
      fileBase,
      cwd: pureOsBackupDesktopFileDir,
    })

    if (!downloadDeviceBackupResponse.ok) {
      return rejectWithValue(downloadDeviceBackupResponse.error)
    }

    void dispatch(loadBackupData())

    return
  }
)
