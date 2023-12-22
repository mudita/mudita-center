/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceError, DeviceEvent } from "Core/device/constants"
import { unlockDeviceRequest } from "Core/device/requests"
import { AppError } from "Core/core/errors"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setUnlockedStatus } from "Core/device/actions/base.action"

export const unlockDevice = createAsyncThunk<
  boolean,
  number[],
  { state: ReduxRootState }
>(DeviceEvent.Unlock, async (code, { rejectWithValue, dispatch, getState }) => {
  const data = await unlockDeviceRequest(code)

  if (!data.ok) {
    return rejectWithValue(
      new AppError(
        DeviceError.Unlocking,
        "Something went wrong during unlocking",
        data
      )
    )
  }

  dispatch(setUnlockedStatus(true))

  return Boolean(data.data)
})
