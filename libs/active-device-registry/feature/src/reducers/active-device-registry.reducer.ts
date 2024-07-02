/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { ActiveDeviceRegistryState } from "active-device-registry/models"
import { setActiveDevice } from "../actions"

export const initialState: ActiveDeviceRegistryState = {
  activeDeviceId: undefined,
}

export const activeDeviceRegistryReducer = createReducer<ActiveDeviceRegistryState>(
  initialState,
  (builder) => {
    builder.addCase(setActiveDevice.fulfilled, (state, action) => {
      return {
        ...state,
        activeDeviceId: action.payload,
      }
    })
  }
)
