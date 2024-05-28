/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { delay } from "shared/utils"
import {
  DeviceCommunicationError,
  DeviceError,
  DeviceEvent,
} from "Core/device/constants"
import {
  deviceLockTimeRequest,
  unlockDeviceRequest,
  unlockDeviceStatusRequest,
} from "Core/device/requests"
import { AppError } from "Core/core/errors"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  getUnlockStatus,
  getUnlockStatusInactive,
} from "Core/device/actions/get-unlock-status.action"
import { DeviceId } from "Core/device/constants/device-id"

export const unlockDevice = createAsyncThunk<
  boolean,
  number[],
  { state: ReduxRootState }
>(DeviceEvent.Unlock, async (code, { rejectWithValue, dispatch }) => {
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

  await delay(500)

  const { payload } = (await dispatch(
    getUnlockStatus()
  )) as PayloadAction<boolean>

  return payload
})

export const unlockDeviceById = createAsyncThunk<
  "ok" | DeviceCommunicationError,
  { code: number[]; deviceId: DeviceId },
  { state: ReduxRootState }
>(
  DeviceEvent.UnlockInactive,
  async ({ code, deviceId }, { rejectWithValue, dispatch }) => {
    const unlockDeviceResult = await unlockDeviceRequest(code, deviceId)

    if (!unlockDeviceResult.ok) {
      return rejectWithValue(
        new AppError(
          DeviceError.Unlocking,
          "Something went wrong during unlocking",
          unlockDeviceResult
        )
      )
    }

    await delay(500)

    const unlockStatus = await unlockDeviceStatusRequest(deviceId)
    const leftTimeResponse = await deviceLockTimeRequest(deviceId)

    console.log({ unlockStatus, leftTimeResponse })

    if (!unlockStatus.ok) {
      return unlockStatus.error.type
    }

    return "ok"
  }
)
