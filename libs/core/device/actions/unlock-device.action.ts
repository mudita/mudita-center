/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceError, DeviceEvent } from "Core/device/constants"
import {
  deviceLockTimeRequest,
  unlockDeviceRequest,
  unlockDeviceStatusRequest,
} from "Core/device/requests"
import { AppError } from "Core/core/errors"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setLockTime } from "Core/device/actions/base.action"

export const unlockDevice = createAsyncThunk<
  boolean,
  number[],
  { state: ReduxRootState }
>(DeviceEvent.Unlock, async (code, { rejectWithValue, dispatch, getState }) => {
  const unlockDeviceResult = await unlockDeviceRequest(code)

  if (!unlockDeviceResult.ok) {
    return rejectWithValue(
      new AppError(
        DeviceError.Unlocking,
        "Something went wrong during unlocking",
        unlockDeviceResult
      )
    )
  }

  const unlockDeviceStatusResult = await unlockDeviceStatusRequest()

  if (unlockDeviceStatusResult.ok) {
    dispatch(setLockTime(undefined))
  }

  if (!unlockDeviceStatusResult.ok) {
    const deviceLockTimeResult = await deviceLockTimeRequest()
    deviceLockTimeResult.ok && dispatch(setLockTime(deviceLockTimeResult.data))
  }

  return unlockDeviceStatusResult.ok
})
