/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { setLockTime } from "Core/device/actions/base.action"
import { DeviceEvent, DeviceType } from "Core/device/constants"
import {
  deviceLockTimeRequest,
  unlockDeviceStatusRequest,
} from "Core/device/requests"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const lockedDevice = createAsyncThunk(
  DeviceEvent.Locked,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    if (state.device.deviceType === DeviceType.MuditaPure) {
      const unlocked = await unlockDeviceStatusRequest()
      const lockTime = await deviceLockTimeRequest()

      if (!unlocked.ok) {
        // TODO: handle if you know what going on
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
