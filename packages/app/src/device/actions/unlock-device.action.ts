/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent } from "App/device/constants"
import unlockDeviceRequest from "Renderer/requests/unlock-device.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { DeviceUnlockingError } from "App/device/errors"

export const unlockDevice = createAsyncThunk<DeviceResponseStatus, number[]>(
  DeviceEvent.Unlock,
  async (code, { rejectWithValue }) => {
    const data = await unlockDeviceRequest(code)

    if (data.status !== DeviceResponseStatus.Ok) {
      return rejectWithValue(
        new DeviceUnlockingError("Something went wrong during unlocking", data)
      )
    }

    return data.status
  }
)
