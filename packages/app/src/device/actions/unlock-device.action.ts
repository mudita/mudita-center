/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceError, DeviceEvent } from "App/device/constants"
import { unlockDeviceRequest } from "App/device/requests"
import { connectDevice } from "App/device/actions/connect-device.action"
import { AppError } from "App/core/errors"

// DEPRECATED
import { ReduxRootState } from "App/__deprecated__/renderer/store"

export const unlockDevice = createAsyncThunk<boolean, number[]>(
  DeviceEvent.Unlock,
  async (code, { rejectWithValue, dispatch, getState }) => {
    const data = await unlockDeviceRequest(code)

    const state = getState() as ReduxRootState

    if (!data.ok) {
      return rejectWithValue(
        new AppError(
          DeviceError.Unlocking,
          "Something went wrong during unlocking",
          data
        )
      )
    }

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    void dispatch(connectDevice(state.device.deviceType!))

    return Boolean(data.data)
  }
)
