/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceError, DeviceEvent } from "App/device/constants"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { loadDeviceData } from "App/device/actions/load-device-data.action"
import { AppError } from "App/core/errors"

export const unlockedDevice = createAsyncThunk(
  DeviceEvent.Unlocked,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    if (state.device.status.unlocked) {
      return
    }

    if (!state.device.deviceType) {
      return rejectWithValue(
        new AppError(DeviceError.Connection, "Cannot connected to device")
      )
    }

    void dispatch(loadDeviceData())

    return
  }
)
