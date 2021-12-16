/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DiagnosticsFilePath } from "@mudita/pure"
import { DeviceEvent } from "App/device/constants"
import updateOs from "Renderer/requests/update-os.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { DeviceUpdateProcessError } from "App/device/errors"
import { removeFile } from "App/device-file-system"

export const startUpdateOs = createAsyncThunk<string, string>(
  DeviceEvent.StartOsUpdateProcess,
  async (file, { dispatch, rejectWithValue }) => {

    await dispatch(removeFile(DiagnosticsFilePath.UPDATER_LOG))
    const data = await updateOs(file)

    if (data.status !== DeviceResponseStatus.Ok) {
      return rejectWithValue(
        new DeviceUpdateProcessError("Device updating process failed", data)
      )
    }

    return data.status
  }
)
