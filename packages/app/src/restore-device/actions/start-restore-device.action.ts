/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { RestoreDeviceEvent } from "App/restore-device/constants"
import startRestoreDeviceRequest from "Renderer/requests/start-restore-device.request"
import { StartRestoreDeviceError } from "App/restore-device/errors"
import uploadDeviceFile from "App/device-file-system/requests/upload-device-file.request"
import { Backup } from "App/backup/reducers"
import { PureDeviceData } from "App/device"
import { ReduxRootState, RootState } from "Renderer/store"
import { waitUntilRestoreDeviceFinished } from "App/restore-device/helpers"
import decryptFile from "App/file-system/requests/decrypt-file.request"
import readFile from "App/file-system/requests/read-file.request"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

export interface StartRestoreOption {
  secretKey: string
  backup: Backup
}

export const startRestoreDevice = createAsyncThunk<
  undefined,
  StartRestoreOption
>(
  RestoreDeviceEvent.StartRestoreDevice,
  async ({ secretKey, backup }, { getState, rejectWithValue }) => {
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
        new StartRestoreDeviceError("Pure OS Backup Pure Location is undefined")
      )
    }

    const buffer = await readFile(backup.filePath)

    if (buffer === undefined) {
      return rejectWithValue(new StartRestoreDeviceError("Read File fails"))
    }

    const decryptedBuffer = await decryptFile({
      buffer,
      key: secretKey,
    })

    if (decryptedBuffer === undefined) {
      return rejectWithValue(
        new StartRestoreDeviceError("Decrypt buffer fails")
      )
    }

    const uploadDeviceFileResponse = await uploadDeviceFile({
      data: decryptedBuffer,
      targetPath: `${pureOsBackupPureLocation}/${backupId}`,
    })

    if (uploadDeviceFileResponse.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new StartRestoreDeviceError("Upload Backup File returns error")
      )
    }

    const startRestoreDeviceResponse = await startRestoreDeviceRequest({
      restore: backupId,
    })

    if (startRestoreDeviceResponse.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new StartRestoreDeviceError("Start restore Device returns error")
      )
    }

    const getRestoreDeviceStatusResponse = await waitUntilRestoreDeviceFinished(
      backupId
    )

    if (getRestoreDeviceStatusResponse.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new StartRestoreDeviceError(
          "One of the getRestoreDeviceStatus requests returns error"
        )
      )
    }

    return
  }
)
