/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { loadDeviceData } from "App/device/actions/load-device-data.action"
import { setConnectionStatus } from "App/device/actions/set-connection-status.action"
import { DeviceError, DeviceEvent } from "App/device/constants"
import connectDeviceRequest from "App/__deprecated__/renderer/requests/connect-device.request"

export const connectDevice = createAsyncThunk<DeviceType, DeviceType>(
  DeviceEvent.Connected,
  async (payload, { dispatch, rejectWithValue }) => {
    const data = await connectDeviceRequest()

    if (data.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new AppError(DeviceError.Connection, "Cannot connected to device", data)
      )
    }

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(setConnectionStatus(true))
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(loadDeviceData(payload))

    return payload
  }
)
