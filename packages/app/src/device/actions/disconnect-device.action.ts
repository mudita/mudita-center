/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent } from "App/device/constants"
import disconnectDeviceRequest from "Renderer/requests/disconnect-device.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { DeviceDisconnectionError } from "App/device/errors"

export const disconnectDevice = createAsyncThunk(
  DeviceEvent.Disconnected,
  async (_, { rejectWithValue }) => {
    const { status } = await disconnectDeviceRequest()

    if (status !== DeviceResponseStatus.Ok) {
      rejectWithValue(
        new DeviceDisconnectionError("Cannot disconnect from device")
      )
    }

    return
  }
)
