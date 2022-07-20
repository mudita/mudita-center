/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceError, DeviceEvent } from "App/device/constants"
import getUnlockDeviceStatusRequest from "App/__deprecated__/renderer/requests/get-unlock-device-status.request"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { AppError } from "App/core/errors"

export const getUnlockStatus = createAsyncThunk<RequestResponseStatus>(
  DeviceEvent.GetUnlockedStatus,
  async (_, { rejectWithValue }) => {
    const data = await getUnlockDeviceStatusRequest()

    if (data.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new AppError(DeviceError.Locked, "Device is locked", data)
      )
    }

    return data.status
  }
)
