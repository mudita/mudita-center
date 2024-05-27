/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent } from "Core/device/constants"
import {
  deviceLockTimeRequest,
  unlockDeviceStatusRequest,
} from "Core/device/requests"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setLockTime } from "Core/device/actions/base.action"
import { getLeftTimeSelector } from "Core/device/selectors"
import { handleCommunicationError } from "Core/device/actions/handle-communication-error.action"
import { DeviceId } from "Core/device/constants/device-id"

export const getUnlockStatus = createAsyncThunk<
  boolean,
  DeviceId | undefined,
  { state: ReduxRootState }
>(DeviceEvent.GetUnlockedStatus, async (deviceId, { dispatch, getState }) => {
  const { ok, error } = await unlockDeviceStatusRequest(deviceId)
  const leftTime = getLeftTimeSelector(getState())

  if (ok && leftTime !== undefined) {
    dispatch(setLockTime(undefined))
  }

  if (error) {
    await dispatch(handleCommunicationError(error))
  }

  return ok
})

export const getUnlockStatusInactive = createAsyncThunk<
  number | undefined,
  DeviceId | undefined,
  { state: ReduxRootState }
>(DeviceEvent.GetUnlockedStatusInactive, async (deviceId) => {
  const leftTimeResponse = await deviceLockTimeRequest(deviceId)

  console.log(leftTimeResponse)
  if (
    leftTimeResponse.ok &&
    leftTimeResponse.data.timeLeftToNextAttempt !== undefined
  ) {
    return leftTimeResponse.data.timeLeftToNextAttempt
  }

  return undefined
})
