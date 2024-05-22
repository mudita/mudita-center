/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { BackupEvent, BackupError } from "Core/backup/constants"
import { CreateBackup } from "Core/backup/dto"
import { createBackupRequest } from "Core/backup/requests/create-backup.request"
import { loadBackupData } from "Core/backup/actions/load-backup-data.action"
import { AppError } from "Core/core/errors"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const startBackupDevice = createAsyncThunk<
  undefined,
  CreateBackup,
  { state: ReduxRootState }
>(
  BackupEvent.CreateBackup,
  async ({ key }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
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
