/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  setOnboardingStatus,
  setCriticalBatteryLevel,
  setLockTime,
} from "App/device/actions/base.action"
import {
  DeviceCommunicationError,
  DeviceError,
  DeviceEvent,
  DeviceType,
} from "App/device/constants"
import {
  deviceLockTimeRequest,
  unlockDeviceStatusRequest,
} from "App/device/requests"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { AppError } from "App/core/errors"

export const lockedDevice = createAsyncThunk(
  DeviceEvent.Locked,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    if (state.device.deviceType === null) {
      return rejectWithValue(
        new AppError(DeviceError.Locking, "`deviceType` is a null")
      )
    }

    if (state.device.deviceType === DeviceType.MuditaPure) {
      const unlocked = await unlockDeviceStatusRequest()
      const lockTime = await deviceLockTimeRequest()

      if (
        !unlocked.ok &&
        unlocked.error.type ===
          DeviceCommunicationError.DeviceOnboardingNotFinished
      ) {
        dispatch(setOnboardingStatus(false))
      }

      if (
        !unlocked.ok &&
        unlocked.error.type === DeviceCommunicationError.BatteryCriticalLevel
      ) {
        dispatch(setCriticalBatteryLevel(true))
      }

      if (!lockTime.ok || !lockTime.data?.phoneLockTime) {
        dispatch(setLockTime(undefined))
      }

      if (lockTime.ok && lockTime.data?.phoneLockTime) {
        dispatch(setLockTime(lockTime.data))
      }
    }

    return
  }
)
