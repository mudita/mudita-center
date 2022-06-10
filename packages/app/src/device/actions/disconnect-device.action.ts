/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent } from "App/device/constants"
import disconnectDeviceRequest from "Renderer/requests/disconnect-device.request"
import { setConnectionStatus } from "App/device/actions/set-connection-status.action"
import { DeviceDisconnectionError } from "App/device/errors"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

export const disconnectDevice = createAsyncThunk(
  DeviceEvent.Disconnected,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const response = await disconnectDeviceRequest()

    if (response.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new DeviceDisconnectionError("Cannot disconnect from device", response)
      )
    }

    dispatch(setConnectionStatus(false))

    return
  }
)
