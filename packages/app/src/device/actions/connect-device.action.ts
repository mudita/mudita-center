/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceType } from "@mudita/pure"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import connectDeviceRequest from "Renderer/requests/connect-device.request"
import { DeviceEvent } from "App/device/constants"
import { loadDeviceData } from "App/device/actions/load-device-data.action"
import { DeviceConnectionError } from "App/device/errors"

export const connectDevice = createAsyncThunk<DeviceType, DeviceType>(
  DeviceEvent.Connected,
  async (payload, { dispatch, rejectWithValue }) => {
    const data = await connectDeviceRequest()

    if (data.status !== DeviceResponseStatus.Ok) {
      return rejectWithValue(
        new DeviceConnectionError("Cannot connected to device", data)
      )
    }

    dispatch(loadDeviceData(payload))

    return payload
  }
)
