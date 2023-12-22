/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { setLockTime } from "Core/device/actions/base.action"
import { DeviceEvent } from "Core/device/constants"
import {
  deviceLockTimeRequest,
  unlockDeviceStatusRequest,
} from "Core/device/requests"

export const lockedDevice = createAsyncThunk(
  DeviceEvent.Locked,
  async (_, { dispatch }) => {
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

    return
  }
)
