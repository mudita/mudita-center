/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent } from "App/device/constants"
import { ReduxRootState } from "App/renderer/store"
import { loadDeviceData } from "App/device/actions/load-device-data.action"
import { DeviceConnectionError } from "App/device/errors"

export const unlockedDevice = createAsyncThunk(
  DeviceEvent.Unlocked,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    if (state.device.status.unlocked) {
      return
    }

    if (!state.device.deviceType) {
      return rejectWithValue(
        new DeviceConnectionError("Cannot connected to device")
      )
    }

    dispatch(loadDeviceData(state.device.deviceType))

    return
  }
)
