/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  loadDeviceData,
  setCriticalBatteryLevel,
  setDeviceData,
  setInitState,
  setOnboardingStatus,
  setUnlockedStatus,
} from "Core/device/actions"
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
      .addCase(loadDeviceData.fulfilled, (state, action) => {
        const { deviceType, ...data } = action.payload
        return {
          ...initialState,
          data,
          deviceType,
          status: initialState.status,
        }
      })
      .addCase(setDeviceData, (state, action) => {
        return {
          ...initialState,
          data: action.payload,
        }
      })
      .addCase(setUnlockedStatus, (state, action) => {
        return {
          ...initialState,
          status: {
            ...initialState.status,
            unlocked: action.payload,
          },
        }
      })
      .addCase(setOnboardingStatus, (state, action) => {
        return {
          ...initialState,
          status: {
            ...initialState.status,
            onboardingFinished: action.payload,
          },
        }
      })
      .addCase(setCriticalBatteryLevel, (state, action) => {
        return {
          ...initialState,
          status: {
            ...initialState.status,
            criticalBatteryLevel: action.payload,
          },
        }
      })
  }
)
