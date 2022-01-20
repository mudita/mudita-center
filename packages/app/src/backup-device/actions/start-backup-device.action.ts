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
import downloadDeviceBackupRequest from "App/backup-device/requests/download-device-backup.request"
import encryptFile from "App/file-system/requests/encrypt-file.request"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { DeviceFile } from "Backend/adapters/device-file-system/device-file-system-adapter.class"

export interface StartBackupOption {
  secretKey: string
}

const downloadDeviceBackupWithRetries = async(time = 0): Promise<DeviceResponse<DeviceFile>> => {
  const response = await downloadDeviceBackupRequest()
  if(isResponsesSuccessWithData([response]) ){
    return response
  } else if(time === 3){
    return response
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(downloadDeviceBackupWithRetries(++time))
      }, 2500)
    })
  }
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
