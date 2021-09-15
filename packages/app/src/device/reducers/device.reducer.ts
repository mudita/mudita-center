/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { DeviceType } from "@mudita/pure"
import {
  rejectedAction,
  pendingAction,
  fulfilledAction,
} from "App/renderer/store/helpers"
import { DeviceEvent, ConnectionState } from "App/device/constants"
import {
  DeviceState,
  ConnectedFulfilledAction,
  ConnectedRejectedAction,
  DisconnectedRejectedAction,
  SetDeviceDataAction,
  LoadDataRejectAction,
  SetPhoneLockTimeAction,
  UnlockDeviceRejectedAction,
} from "App/device/reducers/device.interface"

export const initialState: DeviceState = {
  deviceType: null,
  data: null,
  status: {
    connected: false,
    locked: false,
    loaded: false,
  },
  state: ConnectionState.Empty,
  updatingState: null,
  error: null,
}

export const deviceReducer = createReducer<DeviceState>(
  initialState,
  (builder) => {
    builder
      // Connect/Disconnect functionality
      .addCase(
        fulfilledAction(DeviceEvent.Connected),
        (state, action: ConnectedFulfilledAction) => {
          return {
            ...state,
            deviceType: action.payload,
            status: {
              ...state.status,
              connected: true,
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
            },
            state: ConnectionState.Error,
            error: action.payload,
          }
        }
      )
      .addCase(fulfilledAction(DeviceEvent.Disconnected), (state) => {
        return {
          ...state,
          deviceType: null,
          data: null,
          status: {
            ...state.status,
            connected: false,
            locked: false,
            loaded: false,
          },
          error: null,
        }
      })
      .addCase(
        rejectedAction(DeviceEvent.Disconnected),
        (state, action: DisconnectedRejectedAction) => {
          return {
            ...state,
            status: {
              ...state.status,
              connected: false,
            },
            state: ConnectionState.Error,
            error: action.payload,
          }
        }
      )

      // Lock/Unlock functionality
      .addCase(DeviceEvent.Locked, (state) => {
        return {
          ...state,
          status: {
            ...state.status,
            locked: state.deviceType === DeviceType.MuditaPure,
          },
        }
      })
      .addCase(fulfilledAction(DeviceEvent.Unlocked), (state) => {
        return {
          ...state,
          status: {
            ...state.status,
            locked: false,
          },
          error: null,
        }
      })
      .addCase(
        rejectedAction(DeviceEvent.Unlocked),
        (state, action: UnlockDeviceRejectedAction) => {
          return {
            ...state,
            state: ConnectionState.Error,
            error: action.payload,
          }
        }
      )
      .addCase(
        DeviceEvent.SetLockTime,
        (state, action: SetPhoneLockTimeAction) => {
          return {
            ...state,
            data: {
              ...(state.data ?? {}),
              phoneLockTime: action.payload,
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
  }
)
