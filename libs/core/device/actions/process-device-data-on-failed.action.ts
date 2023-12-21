/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceCommunicationError, DeviceEvent } from "Core/device/constants"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  setCriticalBatteryLevel,
  setOnboardingStatus,
  setUnlockedStatus,
} from "Core/device/actions/base.action"
import { AppError } from "Core/core/errors"

export const processDeviceDataOnFailed = createAsyncThunk<
  void,
  AppError,
  { state: ReduxRootState }
>(DeviceEvent.ProcessDeviceDataOnFailed, async (error, { dispatch }) => {
  const errorType = error.type
  if (errorType === DeviceCommunicationError.DeviceLocked) {
    dispatch(setUnlockedStatus(false))
    return
  }

  if (errorType === DeviceCommunicationError.DeviceOnboardingNotFinished) {
    dispatch(setOnboardingStatus(false))
    return
  }

  if (errorType === DeviceCommunicationError.BatteryCriticalLevel) {
    dispatch(setCriticalBatteryLevel(true))
    return
  }
})
