/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceError, DeviceEvent } from "App/device/constants"
import unlockDeviceRequest from "App/__deprecated__/renderer/requests/unlock-device.request"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { AppError } from "App/core/errors"

export const unlockDevice = createAsyncThunk<RequestResponseStatus, number[]>(
  DeviceEvent.Unlock,
  async (code, { rejectWithValue }) => {
    const data = await unlockDeviceRequest(code)

    if (data.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new AppError(
          DeviceError.Unlocking,
          "Something went wrong during unlocking",
          data
        )
      )
    }

    return data.status
  }
)
