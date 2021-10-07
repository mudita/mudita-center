/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { RestoreDeviceEvent } from "App/restore-device/constants"
import startRestoreDeviceRequest from "Renderer/requests/start-restore-device.request"
import { StartRestoreDeviceError } from "App/restore-device/errors"
import uploadDeviceFile from "Renderer/requests/upload-device-file.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { Backup } from "App/backup/reducers"
import { PureDeviceData } from "App/device"
import { StartBackupDeviceError } from "App/backup-device/errors"
import { ReduxRootState, RootState } from "Renderer/store"
import { waitUntilRestoreDeviceFinished } from "App/restore-device/helpers"

export const startRestoreDevice = createAsyncThunk<undefined, Backup>(
  RestoreDeviceEvent.StartRestoreDevice,
  async (backup, { getState, rejectWithValue }) => {
    const backupId = backup.filePath.split("/").pop() as string
    const state = getState() as RootState & ReduxRootState
    const pureOsBackupPureLocation = (
      state.device.data as PureDeviceData | undefined
    )?.backupLocation

    if (
      pureOsBackupPureLocation === undefined ||
      pureOsBackupPureLocation === ""
    ) {
      return rejectWithValue(
        new StartBackupDeviceError("Pure OS Backup Pure Location is undefined")
      )
    }

    const uploadDeviceFileResponse = await uploadDeviceFile({
      filePath: backup.filePath,
      targetPath: `${pureOsBackupPureLocation}/${backupId}`,
    })

    if (uploadDeviceFileResponse.status !== DeviceResponseStatus.Ok) {
      return rejectWithValue(
        new StartRestoreDeviceError("Upload Backup File returns error")
      )
    }

    const startRestoreDeviceResponse = await startRestoreDeviceRequest({
      restore: backupId,
    })

    if (startRestoreDeviceResponse.status !== DeviceResponseStatus.Ok) {
      return rejectWithValue(
        new StartRestoreDeviceError("Start restore Device returns error")
      )
    }

    const getRestoreDeviceStatusResponse = await waitUntilRestoreDeviceFinished(
      backupId
    )

    if (getRestoreDeviceStatusResponse.status !== DeviceResponseStatus.Ok) {
      return rejectWithValue(
        new StartRestoreDeviceError(
          "One of the getRestoreDeviceStatus requests returns error"
        )
      )
    }

    return
  }
)
