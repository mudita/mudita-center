/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  loadDeviceData,
  loadStorageInfoAction,
  setCriticalBatteryLevelStatus,
  setInitState,
  setOnboardingStatus,
  setRestartingStatus,
  setUnlockedStatus,
} from "Core/device/actions"
import { DeviceState } from "Core/device/reducers/device.interface"
import { AppError } from "Core/core/errors"

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
      .addCase(setCriticalBatteryLevelStatus, (state, action) => {
        return {
          ...initialState,
          status: {
            ...initialState.status,
            criticalBatteryLevel: action.payload,
          },
        }
      })
      .addCase(setRestartingStatus, (state, action) => {
        state.status.restarting = action.payload
      })
      .addCase(loadStorageInfoAction.fulfilled, (state, action) => {
        return {
          ...state,
          data: {
            ...state.data,
            memorySpace: {
              usedUserSpace: action.payload.usedUserSpace,
              reservedSpace: action.payload.reservedSpace,
              total: action.payload.totalSpace,
            },
          },
        }
      })
      .addCase(loadStorageInfoAction.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload as AppError,
        }
      })
  }
)
