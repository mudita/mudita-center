/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { removeFile } from "App/device-file-system"
import { DiagnosticsFilePath } from "App/device/constants"
import { UpdateError, UpdateOsEvent } from "App/update/constants"
import updateOs from "App/__deprecated__/renderer/requests/update-os.request"

export const startUpdateOs = createAsyncThunk<string, string>(
  UpdateOsEvent.StartOsUpdateProcess,
  async (file, { dispatch, rejectWithValue }) => {
    await dispatch(removeFile(DiagnosticsFilePath.UPDATER_LOG))
    const data = await updateOs(file)

    if (data.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new AppError(
          UpdateError.UpdateOsProcess,
          "Device updating process failed",
          data
        )
      )
    }

    return data.status
  }
)
