/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceError, DeviceEvent } from "App/device/constants"
import { unlockDeviceRequest } from "App/device/requests"
import { AppError } from "App/core/errors"

export const unlockDevice = createAsyncThunk<boolean, number[]>(
  DeviceEvent.Unlock,
  async (code, { rejectWithValue }) => {
    const data = await unlockDeviceRequest(code)

    if (!data.ok) {
      return rejectWithValue(
        new AppError(
          DeviceError.Unlocking,
          "Something went wrong during unlocking",
          data
        )
      )
    }

    return Boolean(data.data)
  }
)
