/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { RestoreDeviceEvent } from "App/restore-device/constants"
import startRestoreDeviceRequest from "Renderer/requests/start-restore-device.request"
import { isResponsesSuccessWithData } from "Renderer/utils/is-responses-success-with-data.helpers"
import { StartRestoreDeviceError } from "App/restore-device/errors"
import getRestoreDeviceStatus from "Renderer/requests/get-restore-device-status.request"
import {
  GetRestoreDeviceStatusDataState,
  GetRestoreDeviceStatusResponseBody,
} from "@mudita/pure"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { Backup } from "App/backup/reducers"

const waitUntilRestoreDeviceFinished = async (
  id: string
): Promise<DeviceResponse<GetRestoreDeviceStatusResponseBody>> => {
  const response = await getRestoreDeviceStatus({ id })
  if (
    !isResponsesSuccessWithData([response]) ||
    response.data?.state === GetRestoreDeviceStatusDataState.Error
  ) {
    return { status: DeviceResponseStatus.Error }
  } else if (
    response.data?.state === GetRestoreDeviceStatusDataState.Finished
  ) {
    return response
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(waitUntilRestoreDeviceFinished(id))
      }, 30000)
    })
  }
}

export const startRestoreDevice = createAsyncThunk<undefined, Backup>(
  RestoreDeviceEvent.StartRestoreDevice,
  async (backup, { rejectWithValue }) => {
    const backupId = backup.filePath.split("/").pop() as string
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

    if (!isResponsesSuccessWithData([getRestoreDeviceStatusResponse])) {
      return rejectWithValue(
        new StartRestoreDeviceError(
          "One of the getRestoreDeviceStatus requests returns error"
        )
      )
    }

    return
  }
)
