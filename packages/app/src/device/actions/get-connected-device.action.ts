/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import connectDeviceRequest from "Renderer/requests/connect-device.request"
import { DeviceEvent } from "App/device/constants"
import { connectDevice } from "App/device/actions/connect-device.action"
import { DeviceConnectionError } from "App/device/errors"

export const getConnectedDevice = createAsyncThunk(
  DeviceEvent.GetConnected,
  async (_, { dispatch, rejectWithValue }) => {
    const { status, data } = await connectDeviceRequest()

    if (status !== DeviceResponseStatus.Ok || !data) {
      return rejectWithValue(
        new DeviceConnectionError("Cannot connected to device")
      )
    }

    dispatch(connectDevice(data.deviceType))

    return
  }
)
