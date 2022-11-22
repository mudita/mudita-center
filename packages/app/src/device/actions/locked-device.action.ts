/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceType } from "App/device/constants"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { DeviceEvent } from "App/device/constants"
import {
  unlockDeviceStatusRequest,
  deviceLockTimeRequest,
} from "App/device/requests"
import { setLockTime, setAgreementStatus } from "App/device/actions/base.action"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

export const lockedDevice = createAsyncThunk(
  DeviceEvent.Locked,
  async (_, { getState, dispatch }) => {
    const state = getState() as ReduxRootState

    if (state.device.deviceType === DeviceType.MuditaPure) {
      const unlocked = await unlockDeviceStatusRequest()
      const lockTime = await deviceLockTimeRequest()

      if (unlocked.data === RequestResponseStatus.NotAcceptable) {
        dispatch(setAgreementStatus(false))
      }

      if (!lockTime.ok && !lockTime.data?.phoneLockTime) {
        dispatch(setLockTime(undefined))
      }

      if (lockTime.ok && lockTime.data?.phoneLockTime) {
        dispatch(setLockTime(lockTime.data))
      }
    }

    return
  }
)
