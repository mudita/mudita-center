/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceType } from "@mudita/pure"
import { ReduxRootState } from "App/renderer/store"
import { DeviceEvent } from "App/device/constants"
import getDeviceLockTime from "App/renderer/requests/get-device-lock-time.request"
import { setLockTime } from "App/device/actions/base.action"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

export const lockedDevice = createAsyncThunk(
  DeviceEvent.Locked,
  async (_, { getState, dispatch }) => {
    const state = getState() as ReduxRootState

    if (state.device.deviceType === DeviceType.MuditaPure) {
      const response = await getDeviceLockTime()

      if (
        response.status === RequestResponseStatus.UnprocessableEntity &&
        !response.data?.phoneLockTime
      ) {
        dispatch(setLockTime(undefined))
      }

      if (
        response.status === RequestResponseStatus.Ok &&
        response.data?.phoneLockTime
      ) {
        dispatch(setLockTime(response.data))
      }
    }

    return
  }
)
