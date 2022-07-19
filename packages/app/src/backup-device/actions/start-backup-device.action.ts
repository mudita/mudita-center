/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  BackupDeviceError,
  BackupDeviceEvent,
} from "App/backup-device/constants"
import { downloadDeviceBackupWithRetries } from "App/backup-device/helpers/download-device-backup-with-retries"
import { loadBackupData } from "App/backup/actions"
import { AppError } from "App/core/errors"
import { isResponsesSuccessWithData } from "App/core/helpers"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

export interface StartBackupOption {
  secretKey: string
}

export const startBackupDevice = createAsyncThunk<undefined, StartBackupOption>(
  BackupDeviceEvent.StartBackupDevice,
  async ({ secretKey }, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState & ReduxRootState
    const pureOsBackupDesktopFileDir = state.settings.osBackupLocation

    if (
      pureOsBackupDesktopFileDir === undefined ||
      pureOsBackupDesktopFileDir === ""
    ) {
      return rejectWithValue(
        new AppError(
          BackupDeviceError.StartBackupDevice,
          "Pure OS Backup Desktop Location is undefined"
        )
      )
    }

    const downloadDeviceBackupResponse = await downloadDeviceBackupWithRetries({
      key: secretKey,
      cwd: pureOsBackupDesktopFileDir,
    })

    if (!isResponsesSuccessWithData([downloadDeviceBackupResponse])) {
      return rejectWithValue(
        new AppError(
          BackupDeviceError.StartBackupDevice,
          downloadDeviceBackupResponse.error?.message ?? ""
        )
      )
    }

    dispatch(loadBackupData())

    return
  }
)
