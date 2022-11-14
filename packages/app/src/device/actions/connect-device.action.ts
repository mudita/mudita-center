/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { loadDeviceData } from "App/device/actions/load-device-data.action"
import { setConnectionStatus } from "App/device/actions/set-connection-status.action"
import { DeviceError, DeviceEvent } from "App/device/constants"
import { connectDeviceRequest } from "App/device/requests"

export const connectDevice = createAsyncThunk<DeviceType, DeviceType>(
  DeviceEvent.Connected,
  async (payload, { dispatch, rejectWithValue }) => {
    const data = await connectDeviceRequest()

    if (!data.ok) {
      return rejectWithValue(
        new AppError(DeviceError.Connection, "Cannot connected to device", data)
      )
    }

    void dispatch(setConnectionStatus(true))
    void dispatch(loadDeviceData())

    return payload
  }
)
