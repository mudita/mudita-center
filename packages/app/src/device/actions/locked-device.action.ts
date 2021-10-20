/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceType } from "@mudita/pure"
import { ReduxRootState } from "App/renderer/store"
import { DeviceEvent } from "App/device/constants"
import getDeviceLockTime from "App/renderer/requests/get-device-lock-time.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { setLockTime } from "App/device/actions/base.action"
import { flags, Feature } from "App/feature-flags"

export const lockedDevice = createAsyncThunk(
  DeviceEvent.Locked,
  async (_, { getState, dispatch }) => {
    const state = getState() as ReduxRootState

    if (flags.get(Feature.PhoneLockTimer) && state.device.deviceType === DeviceType.MuditaPure) {
      const response = await getDeviceLockTime()

      if (
        response.status === DeviceResponseStatus.UnprocessableEntity &&
        !response.data?.phoneLockTime
      ) {
        dispatch(setLockTime(undefined))
      }

      if (
        response.status === DeviceResponseStatus.Ok &&
        response.data?.phoneLockTime
      ) {
        dispatch(setLockTime(response.data.phoneLockTime))
      }
    }

    return
  }
)
