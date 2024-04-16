/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  DeviceInitializationState,
  DeviceInitializationStatus,
} from "Core/device-initialization/reducers/device-initialization.interface"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"

export const initialState: DeviceInitializationState = {
  deviceInitializationStatus: DeviceInitializationStatus.Idle,
}

export const deviceInitializationReducer =
  createReducer<DeviceInitializationState>(initialState, (builder) => {
    builder.addCase(setDeviceInitializationStatus, (state, action) => {
      return {
        ...state,
        deviceInitializationStatus: action.payload,
      }
    })
  })
