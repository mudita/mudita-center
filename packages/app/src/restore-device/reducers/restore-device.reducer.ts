/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  RestoreDeviceDataState,
  RestoreDeviceState,
  StartRestoreDeviceErrorRejectAction,
} from "App/restore-device/reducers/restore-device.interface"
import { RestoreDeviceEvent } from "App/restore-device/constants"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers/action.helper"

export const initialState: RestoreDeviceState = {
  state: RestoreDeviceDataState.Empty,
  error: null,
}

export const restoreDeviceReducer = createReducer<RestoreDeviceState>(
  initialState,
  (builder) => {
    builder
      .addCase(
        pendingAction(RestoreDeviceEvent.StartRestoreDevice),
        (state) => {
          return {
            ...state,
            state: RestoreDeviceDataState.Running,
          }
        }
      )
      .addCase(
        fulfilledAction(RestoreDeviceEvent.StartRestoreDevice),
        (state) => {
          return {
            ...state,
            state: RestoreDeviceDataState.Finished,
            error: null,
          }
        }
      )
      .addCase(
        rejectedAction(RestoreDeviceEvent.StartRestoreDevice),
        (state, action: StartRestoreDeviceErrorRejectAction) => {
          return {
            ...state,
            state: RestoreDeviceDataState.Error,
            error: action.payload,
          }
        }
      )

      .addCase(RestoreDeviceEvent.ReadRestoreDeviceDataState, (state) => {
        return {
          ...state,
          state: RestoreDeviceDataState.Empty,
          error: null,
        }
      })
  }
)
