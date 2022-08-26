/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import connectDeviceRequest from "App/__deprecated__/renderer/requests/connect-device.request"
import { DeviceError, DeviceEvent } from "App/device/constants"
import { connectDevice } from "App/device/actions/connect-device.action"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { AppError } from "App/core/errors"

export const getConnectedDevice = createAsyncThunk(
  DeviceEvent.GetConnected,
  async (_, { dispatch, rejectWithValue }) => {
    const response = await connectDeviceRequest()

    if (response.status !== RequestResponseStatus.Ok || !response.data) {
      return rejectWithValue(
        new AppError(
          DeviceError.Connection,
          "Cannot connected to device",
          response
        )
      )
    }

    void dispatch(connectDevice(response.data.deviceType))

    return
  }
)
