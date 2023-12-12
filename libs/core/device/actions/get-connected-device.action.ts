/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { connectDeviceRequest } from "Core/device/requests"
import { DeviceError, DeviceEvent } from "Core/device/constants"
import { AppError } from "Core/core/errors"

export const getConnectedDevice = createAsyncThunk(
  DeviceEvent.GetConnected,
  async (_, { rejectWithValue }) => {
    const response = await connectDeviceRequest()

    if (!response.data || !response.data) {
      return rejectWithValue(
        new AppError(
          DeviceError.Connection,
          "Cannot connected to device",
          response
        )
      )
    }

    return
  }
)
