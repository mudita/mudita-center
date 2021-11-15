/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { BackupDeviceEvent } from "App/backup-device/constants"
import path from "path"
import startBackupDeviceRequest from "Renderer/requests/start-backup-device.request"
import { isResponsesSuccessWithData } from "Renderer/utils/is-responses-success-with-data.helpers"
import { StartBackupDeviceError } from "App/backup-device/errors"
import getBackupDeviceStatus from "Renderer/requests/get-backup-device-status.request"
import {
  GetBackupDeviceStatusDataState,
  GetBackupDeviceStatusResponseBody,
} from "@mudita/pure"
import downloadDeviceFile from "Renderer/requests/download-device-file.request"
import writeFile from "Renderer/requests/write-file.request"
import { ReduxRootState, RootState } from "Renderer/store"
import { loadBackupData } from "App/backup/actions"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { PureDeviceData } from "App/device"
import encryptFile from "App/files-system/requests/encrypt-file.request"

export interface StartBackupOption {
  secretKey: string
}

const waitUntilBackupDeviceFinished = async (
  id: string
): Promise<DeviceResponse<GetBackupDeviceStatusResponseBody>> => {
  const response = await getBackupDeviceStatus({ id })
  if (
    !isResponsesSuccessWithData([response]) ||
    response.data?.state === GetBackupDeviceStatusDataState.Error
  ) {
    return { status: DeviceResponseStatus.Error }
  } else if (response.data?.state === GetBackupDeviceStatusDataState.Finished) {
    return response
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(waitUntilBackupDeviceFinished(id))
      }, 30000)
    })
  }
}

export const startBackupDevice = createAsyncThunk<undefined, StartBackupOption>(
  BackupDeviceEvent.StartBackupDevice,
  async ({ secretKey }, { getState, dispatch, rejectWithValue }) => {
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

    const startBackupDeviceResponse = await startBackupDeviceRequest()

    if (!isResponsesSuccessWithData([startBackupDeviceResponse])) {
      return rejectWithValue(
        new StartBackupDeviceError("Start backup Device returns error")
      )
    }

    const backupId = startBackupDeviceResponse.data!.id

    const getBackupDeviceStatusResponse = await waitUntilBackupDeviceFinished(
      backupId
    )
    const location = path.join(pureOsBackupPureLocation, backupId)
    if (!isResponsesSuccessWithData([getBackupDeviceStatusResponse])) {
      return rejectWithValue(
        new StartBackupDeviceError(
          "One of the getBackupDeviceStatus requests returns error"
        )
      )
    }

    const downloadDeviceFileResponse = await downloadDeviceFile(location)
    if (!isResponsesSuccessWithData([downloadDeviceFileResponse])) {
      return rejectWithValue(
        new StartBackupDeviceError("Download device file request returns error")
      )
    }

    const encryptedBuffer = await encryptFile({
      buffer: downloadDeviceFileResponse.data!.data,
      key: secretKey,
    })

    if (encryptedBuffer === undefined) {
      return rejectWithValue(new StartBackupDeviceError("Encrypt buffer fails"))
    }

    const writeFileSuccess = await writeFile({
      fileName: backupId,
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
