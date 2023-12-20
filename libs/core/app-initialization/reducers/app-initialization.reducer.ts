/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  AppInitializationState,
  AppInitializationStatus,
} from "Core/app-initialization/reducers/app-initialization.interface"
import { setAppInitializationStatus } from "Core/app-initialization/actions/base.action"
import { startInitializingApp } from "Core/app-initialization/actions/start-initializing-app"

export const initialState: AppInitializationState = {
  appInitializationStatus: AppInitializationStatus.Idle,
}

export const appInitializationReducer = createReducer<AppInitializationState>(
  initialState,
  (builder) => {
    builder
      .addCase(setAppInitializationStatus, (state, action) => {
        return {
          ...state,
          appInitializationStatus: action.payload,
        }
      })
      .addCase(startInitializingApp.pending, (state) => {
        return {
          ...state,
          appInitializationStatus: AppInitializationStatus.Initializing,
        }
      })
  }
)
