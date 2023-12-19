/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import {
  AppInitializationState,
  AppInitializationStatus,
} from "Core/app-initialization/reducers/app-initialization.interface"

export const initialState: AppInitializationState = {
  appInitializationStatus: AppInitializationStatus.Idle,
}

export const appInitializationReducer = createReducer<AppInitializationState>(
  initialState,
  (builder) => {
    builder.addCase(setDeviceInitializationStatus, (state, action) => {
      return {
        ...state,
        deviceInitializationStatus: action.payload,
      }
    })
  }
)
