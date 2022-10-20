/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceType } from "App/device/constants"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { DeviceEvent } from "App/device/constants"
import getDeviceLockTime from "App/__deprecated__/renderer/requests/get-device-lock-time.request"
import getUnlockDeviceStatus from "App/__deprecated__/renderer/requests/get-unlock-device-status.request"
import { setLockTime, setAgreementStatus } from "App/device/actions/base.action"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

export const lockedDevice = createAsyncThunk(
  DeviceEvent.Locked,
  async (_, { getState, dispatch }) => {
    const state = getState() as ReduxRootState

    if (state.device.deviceType === DeviceType.MuditaPure) {
      const unlocked = await getUnlockDeviceStatus()
      const lockTime = await getDeviceLockTime()

      if (unlocked.status === RequestResponseStatus.NotAcceptable) {
        dispatch(setAgreementStatus(false))
      }

      if (
        lockTime.status === RequestResponseStatus.UnprocessableEntity &&
        !lockTime.data?.phoneLockTime
      ) {
        dispatch(setLockTime(undefined))
      }

      if (
        lockTime.status === RequestResponseStatus.Ok &&
        lockTime.data?.phoneLockTime
      ) {
        dispatch(setLockTime(lockTime.data))
      }
    }

    return
  }
)
