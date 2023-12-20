/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { setDeviceData, setInitState } from "Core/device/actions"
import { DeviceState } from "Core/device/reducers/device.interface"

export const initialState: DeviceState = {
  deviceType: null,
  data: null,
  status: {
    unlocked: null,
    loaded: null,
    onboardingFinished: null,
    criticalBatteryLevel: null,
    restarting: null,
  },
  error: null,
  externalUsageDevice: null,
}

export const deviceReducer = createReducer<DeviceState>(
  initialState,
  (builder) => {
    builder
      .addCase(setInitState, () => {
        return {
          ...initialState,
        }
      })
      .addCase(setDeviceData, (state, action) => {
        return {
          ...initialState,
          data: action.payload,
          deviceType: action.payload.deviceType,
        }
      })
  }
)
