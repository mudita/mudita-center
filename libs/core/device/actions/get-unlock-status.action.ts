/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceError, DeviceEvent } from "Core/device/constants"
import { unlockDeviceStatusRequest } from "Core/device/requests"
import { AppError } from "Core/core/errors"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const getUnlockStatus = createAsyncThunk<
  boolean,
  undefined,
  { state: ReduxRootState }
>(DeviceEvent.GetUnlockedStatus, async (_, { rejectWithValue }) => {
  const data = await unlockDeviceStatusRequest()

  if (!data.ok) {
    return rejectWithValue(
      new AppError(DeviceError.Locked, "Device is locked", data)
    )
  }

  return data.ok
})
