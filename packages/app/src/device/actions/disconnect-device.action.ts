/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { setConnectionStatus } from "App/device/actions/set-connection-status.action"
import { DeviceError, DeviceEvent } from "App/device/constants"
import disconnectDeviceRequest from "App/__deprecated__/renderer/requests/disconnect-device.request"

export const disconnectDevice = createAsyncThunk(
  DeviceEvent.Disconnected,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, { getState, dispatch, rejectWithValue }) => {
    const response = await disconnectDeviceRequest()

    if (response.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new AppError(
          DeviceError.Disconnection,
          "Cannot disconnect from device",
          response
        )
      )
    }

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(setConnectionStatus(false))

    return
  }
)
