/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent } from "App/device/constants"
import getUnlockDeviceStatusRequest from "Renderer/requests/get-unlock-device-status.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { DeviceLockedError } from "App/device/errors"

export const getUnlockStatus = createAsyncThunk<string>(
  DeviceEvent.Unlock,
  async (_, { rejectWithValue }) => {
    const data = await getUnlockDeviceStatusRequest()

    if (data.status !== DeviceResponseStatus.Ok) {
      return rejectWithValue(new DeviceLockedError("Device is locked", data))
    }

    return data.status
  }
)
