/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { BackupDeviceEvent } from "App/backup-device/constants"
import { isResponsesSuccessWithData } from "Renderer/utils/is-responses-success-with-data.helpers"
import { StartBackupDeviceError } from "App/backup-device/errors"
import { ReduxRootState, RootState } from "Renderer/store"
import { loadBackupData } from "App/backup/actions"
import { downloadDeviceBackupWithRetries } from "App/backup-device/helpers/download-device-backup-with-retries"

export interface StartBackupOption {
  secretKey: string
}

export const startBackupDevice = createAsyncThunk<undefined, StartBackupOption>(
  BackupDeviceEvent.StartBackupDevice,
  async ({ secretKey }, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState & ReduxRootState
    const pureOsBackupDesktopFileDir = state.settings.pureOsBackupLocation

    if (
      pureOsBackupDesktopFileDir === undefined ||
      pureOsBackupDesktopFileDir === ""
    ) {
      return rejectWithValue(
        new StartBackupDeviceError(
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
        new StartBackupDeviceError(
          downloadDeviceBackupResponse.error?.message ?? ""
        )
      )
    }

    dispatch(loadBackupData())

    return
  }
)
