/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "App/renderer/store"
import { DeviceEvent } from "App/device/constants"
import disconnectDeviceRequest from "Renderer/requests/disconnect-device.request"
import { setConnectionStatus } from "App/device/actions/base.action"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { DeviceDisconnectionError } from "App/device/errors"

export const disconnectDevice = createAsyncThunk(
  DeviceEvent.Disconnected,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    if (state.device.updatingState !== null) {
      return
    }

    const response = await disconnectDeviceRequest()

    if (response.status !== DeviceResponseStatus.Ok) {
      return rejectWithValue(
        new DeviceDisconnectionError("Cannot disconnect from device", response)
      )
    }

    dispatch(setConnectionStatus(false))

    return
  }
)
