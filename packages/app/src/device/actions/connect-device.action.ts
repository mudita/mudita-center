/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceType } from "@mudita/pure"
import connectDeviceRequest from "App/__deprecated__/renderer/requests/connect-device.request"
import { DeviceEvent } from "App/device/constants"
import { setConnectionStatus } from "App/device/actions/set-connection-status.action"
import { loadDeviceData } from "App/device/actions/load-device-data.action"
import { DeviceConnectionError } from "App/device/errors"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

export const connectDevice = createAsyncThunk<DeviceType, DeviceType>(
  DeviceEvent.Connected,
  async (payload, { dispatch, rejectWithValue }) => {
    const data = await connectDeviceRequest()

    if (data.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new DeviceConnectionError("Cannot connected to device", data)
      )
    }

    dispatch(setConnectionStatus(true))
    dispatch(loadDeviceData(payload))

    return payload
  }
)
