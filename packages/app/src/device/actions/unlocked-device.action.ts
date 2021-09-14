/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
// import { DeviceType } from "@mudita/pure"
import { DeviceEvent } from "App/device/constants"
// import { DeviceResponseStatus } from "App/backend/adapters/device-response.interface"
import { ReduxRootState } from "App/renderer/store"
import { loadDeviceData } from "App/device/actions/load-device-data.action"
// import { setLockTime } from "App/device/actions/base.action"
// import getDeviceLockTime from "App/renderer/requests/get-device-lock-time.request"
import { DeviceConnectionError } from "App/device/errors"

export const unlockedDevice = createAsyncThunk(
  DeviceEvent.Unlocked,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    if (!state.device.status.locked) {
      return
    }

    if (!state.device.deviceType) {
      return rejectWithValue(
        new DeviceConnectionError("Cannot connected to device")
      )
    }

    // if (state.device.deviceType === DeviceType.MuditaPure) {
    //   const response = await getDeviceLockTime()

    //   if (response.status !== DeviceResponseStatus.Ok || !response.data?.phoneLockTime) {
    //     return rejectWithValue(new DeviceInvalidPhoneLockTimeError("Cannot get device lock time", response))
    //   }

    //   dispatch(setLockTime(response.data.phoneLockTime))
    // }

    dispatch(loadDeviceData(state.device.deviceType))

    return
  }
)
