/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { DeviceType } from "App/device/constants"
import {
  rejectedAction,
  pendingAction,
  fulfilledAction,
} from "App/__deprecated__/renderer/store/helpers"
import { DeviceEvent, ConnectionState } from "App/device/constants"
import {
  DeviceState,
  PureDeviceData,
  ConnectedFulfilledAction,
  ConnectedRejectedAction,
  SetDeviceDataAction,
  LoadDataRejectAction,
  SetPhoneLockTimeAction,
  SetSimDataAction,
  SetOsVersionDataAction,
  SetConnectionStateAction,
  LoadStorageInfoAction,
  LoadStorageInfoRejectedAction,
} from "App/device/reducers/device.interface"
import {
  setOnboardingStatus,
  setCriticalBatteryLevel,
  setExternalUsageDevice,
  setRestarting,
  unlockedDevice,
} from "App/device/actions/base.action"

export const initialState: DeviceState = {
  deviceType: null,
  data: null,
  status: {
    connecting: false,
    connected: false,
    unlocked: null,
    loaded: false,
    onboardingFinished: true,
    criticalBatteryLevel: false,
    restarting: false,
  },
  state: ConnectionState.Empty,
  error: null,
  externalUsageDevice: null,
}

export const deviceReducer = createReducer<DeviceState>(
  initialState,
  (builder) => {
    builder
      // SetInitState functionality
      .addCase(DeviceEvent.SetInitState, () => {
        return {
          ...initialState,
        }
      })

      // Connect/Disconnect functionality
      .addCase(pendingAction(DeviceEvent.Connected), (state) => {
        return {
          ...state,
          state: ConnectionState.Loading,
          status: {
            ...state.status,
            connecting: true,
            connected: false,
            loaded: false,
          },
          error: null,
          externalUsageDevice: null,
        }
      })
      .addCase(
        fulfilledAction(DeviceEvent.Connected),
        (state, action: ConnectedFulfilledAction) => {
          return {
            ...state,
            deviceType: action.payload,
            status: {
              ...state.status,
              connected: true,
              connecting: false,
            },
            error: null,
          }
        }
      )
      .addCase(
        rejectedAction(DeviceEvent.Connected),
        (state, action: ConnectedRejectedAction) => {
          return {
            ...state,
            status: {
              ...state.status,
              connected: false,
              connecting: false,
            },
            state: ConnectionState.Error,
            error: action.payload,
          }
        }
      )
      .addCase(pendingAction(DeviceEvent.Disconnected), (state) => {
        return {
          ...state,
          state: ConnectionState.Loading,
          error: null,
          externalUsageDevice: null,
        }
      })
      .addCase(fulfilledAction(DeviceEvent.Disconnected), (state) => {
        return {
          ...state,
          state: ConnectionState.Empty,
          error: null,
        }
      })
      .addCase(
        fulfilledAction(DeviceEvent.SetConnectionState),
        (state, action: SetConnectionStateAction) => {
          return {
            ...state,
            status: {
              ...state.status,
              connected: action.payload ? action.payload : false,
              connecting: action.payload ? state.status.connecting : false,
            },
            error: null,
          }
        }
      )

      // Lock/Unlock functionality
      .addCase(fulfilledAction(DeviceEvent.Locked), (state) => {
        return {
          ...state,
          status: {
            ...state.status,
            unlocked: state.deviceType === DeviceType.MuditaHarmony,
            loaded: false,
          },
        }
      })
      .addCase(unlockedDevice, (state) => {
        return {
          ...state,
          status: {
            ...state.status,
            unlocked: true,
          },
          error: null,
        }
      })
      .addCase(
        DeviceEvent.SetLockTime,
        (state, action: SetPhoneLockTimeAction) => {
          return {
            ...state,
            data: {
              ...(state.data ?? {}),
              phoneLockTime: action.payload?.phoneLockTime,
              timeLeftToNextAttempt: action.payload?.timeLeftToNextAttempt,
            },
          }
        }
      )

      // Passing data from the connecting device to state
      .addCase(DeviceEvent.SetData, (state, action: SetDeviceDataAction) => {
        return {
          ...state,
          data: {
            ...(state.data ?? {}),
            ...action.payload,
          },
          error: null,
        }
      })

      // Sim card functionality
      .addCase(DeviceEvent.SetSimData, (state, action: SetSimDataAction) => {
        let simCards = null

        if (state.deviceType && state.deviceType === DeviceType.MuditaPure) {
          simCards = [
            {
              ...(state.data as PureDeviceData)?.simCards[0],
              active:
                (state.data as PureDeviceData)?.simCards[0].number ===
                action.payload,
            },
            {
              ...(state.data as PureDeviceData)?.simCards[1],
              active:
                (state.data as PureDeviceData)?.simCards[1].number ===
                action.payload,
            },
          ]
        }

        return {
          ...state,
          data: {
            ...(state.data ?? {}),
            ...(simCards && {
              simCards,
            }),
          },
        }
      })

      // OS Updates
      .addCase(
        DeviceEvent.SetOsVersionData,
        (state, action: SetOsVersionDataAction) => {
          return {
            ...state,
            data: {
              ...(state.data ?? {}),
              ...action.payload,
            },
          }
        }
      )
      // Updates loading data state
      .addCase(pendingAction(DeviceEvent.Loading), (state) => {
        return {
          ...state,
          state: ConnectionState.Loading,
        }
      })
      .addCase(fulfilledAction(DeviceEvent.Loading), (state) => {
        return {
          ...state,
          status: {
            ...state.status,
            loaded: true,
          },
          state: ConnectionState.Loaded,
          error: null,
        }
      })
      .addCase(
        rejectedAction(DeviceEvent.Loading),
        (state, action: LoadDataRejectAction) => {
          return {
            ...state,
            data: null,
            state: ConnectionState.Error,
            error: action.payload,
          }
        }
      )

      .addCase(
        fulfilledAction(DeviceEvent.LoadStorageInfo),
        (state, action: LoadStorageInfoAction) => {
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
        }
      )
      .addCase(
        rejectedAction(DeviceEvent.LoadStorageInfo),
        (state, action: LoadStorageInfoRejectedAction) => {
          return {
            ...state,
            state: ConnectionState.Error,
            error: action.payload,
          }
        }
      )

      .addCase(setOnboardingStatus, (state, action) => {
        state.status.onboardingFinished = action.payload
      })

      .addCase(setCriticalBatteryLevel, (state, action) => {
        state.status.criticalBatteryLevel = action.payload
      })
      .addCase(setExternalUsageDevice, (state, action) => {
        state.externalUsageDevice = action.payload
      })
      .addCase(setRestarting, (state, action) => {
        state.status.restarting = action.payload
      })
  }
)
