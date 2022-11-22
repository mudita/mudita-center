/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceError, DeviceEvent } from "App/device/constants"
import { unlockDeviceStatusRequest } from "App/device/requests"
import { AppError } from "App/core/errors"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

export const getUnlockStatus = createAsyncThunk<RequestResponseStatus>(
  DeviceEvent.GetUnlockedStatus,
  async (_, { rejectWithValue }) => {
    const data = await unlockDeviceStatusRequest()

    if (!data.ok || !data.data) {
      return rejectWithValue(
        new AppError(DeviceError.Locked, "Device is locked", data)
      )
    }

    return data.data
  }
)
