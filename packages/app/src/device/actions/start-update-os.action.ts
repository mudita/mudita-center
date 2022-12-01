/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DiagnosticsFilePath } from "App/device/constants"
import { DeviceError, DeviceEvent } from "App/device/constants"
import { startOsUpdate } from "App/update/requests/start-os-update.request"
import { removeFile } from "App/device-file-system"
import { AppError } from "App/core/errors"

export const startUpdateOs = createAsyncThunk<boolean, string>(
  DeviceEvent.StartOsUpdateProcess,
  async (file, { dispatch, rejectWithValue }) => {
    await dispatch(removeFile(DiagnosticsFilePath.UPDATER_LOG))
    const { ok, data } = await startOsUpdate({ fileName: file })

    if (!ok || !data) {
      return rejectWithValue(
        new AppError(
          DeviceError.UpdateProcess,
          "Device updating process failed",
          data
        )
      )
    }

    return data
  }
)
