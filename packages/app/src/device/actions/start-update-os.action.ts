/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DiagnosticsFilePath } from "@mudita/pure"
import { DeviceError, DeviceEvent } from "App/device/constants"
import updateOs from "App/__deprecated__/renderer/requests/update-os.request"
import { removeFile } from "App/device-file-system"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { AppError } from "App/core/errors"

export const startUpdateOs = createAsyncThunk<string, string>(
  DeviceEvent.StartOsUpdateProcess,
  async (file, { dispatch, rejectWithValue }) => {
    await dispatch(removeFile(DiagnosticsFilePath.UPDATER_LOG))
    const data = await updateOs(file)

    if (data.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new AppError(
          DeviceError.UpdateProcess,
          "Device updating process failed",
          data
        )
      )
    }

    return data.status
  }
)
