/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceCommunicationError } from "core-device/models"
import { DeviceEvent } from "Core/device/constants"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  setCriticalBatteryLevelStatus,
  setLockTime,
  setOnboardingStatus,
  setUnlockedStatus,
} from "Core/device/actions/base.action"
import { AppError } from "Core/core/errors"
import { deviceLockTimeRequest } from "Core/device/requests"

export const handleCommunicationError = createAsyncThunk<
  void,
  AppError,
  { state: ReduxRootState }
>(DeviceEvent.HandleCommunicationError, async (error, { dispatch }) => {
  const errorType = error.type
  if (errorType === DeviceCommunicationError.BatteryCriticalLevel) {
    dispatch(setCriticalBatteryLevelStatus(true))
    return
  }

  if (errorType === DeviceCommunicationError.DeviceOnboardingNotFinished) {
    dispatch(setOnboardingStatus(false))
    return
  }

  if (errorType === DeviceCommunicationError.DeviceLocked) {
    const deviceLockTimeResult = await deviceLockTimeRequest()
    deviceLockTimeResult.ok && dispatch(setLockTime(deviceLockTimeResult.data))
    dispatch(setUnlockedStatus(false))
    return
  }
})
