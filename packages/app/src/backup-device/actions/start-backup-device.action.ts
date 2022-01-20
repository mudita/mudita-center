/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { BackupDeviceEvent } from "App/backup-device/constants"
import { isResponsesSuccessWithData } from "Renderer/utils/is-responses-success-with-data.helpers"
import { StartBackupDeviceError } from "App/backup-device/errors"
import writeFile from "Renderer/requests/write-file.request"
import { ReduxRootState, RootState } from "Renderer/store"
import { loadBackupData } from "App/backup/actions"
import encryptFile from "App/file-system/requests/encrypt-file.request"
import { downloadDeviceBackupWithRetries } from "App/backup-device/helpers/download-device-backup-with-retries"

export interface StartBackupOption {
  secretKey: string
}

export const startBackupDevice = createAsyncThunk<undefined, StartBackupOption>(
  BackupDeviceEvent.StartBackupDevice,
  async ({ secretKey }, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState & ReduxRootState
    const pureOsBackupDesktopLocation = state.settings.pureOsBackupLocation

    if (
      pureOsBackupDesktopLocation === undefined ||
      pureOsBackupDesktopLocation === ""
    ) {
      return rejectWithValue(
        new StartBackupDeviceError(
          "Pure OS Backup Desktop Location is undefined"
        )
      )
    }

    const downloadDeviceBackupResponse = await downloadDeviceBackupWithRetries()

    if (!isResponsesSuccessWithData([downloadDeviceBackupResponse])) {
      return rejectWithValue(
        new StartBackupDeviceError(
          downloadDeviceBackupResponse.error?.message ?? ""
        )
      )
    }

    const encryptedBuffer = await encryptFile({
      buffer: downloadDeviceBackupResponse.data!.data,
      key: secretKey,
    })

    if (encryptedBuffer === undefined) {
      return rejectWithValue(new StartBackupDeviceError("Encrypt buffer fails"))
    }

    const writeFileSuccess = await writeFile({
      fileName: downloadDeviceBackupResponse.data!.name,
      filePath: pureOsBackupDesktopLocation,
      data: encryptedBuffer,
    })

    if (!writeFileSuccess) {
      return rejectWithValue(
        new StartBackupDeviceError("write file request returns error")
      )
    }

    dispatch(loadBackupData())

    return
  }
)
