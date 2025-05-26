/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  setConnectedDevices,
  setCurrentDevice,
  setDrawerVisibility,
} from "./devices.actions"
import { DevicesReducer } from "devices/common/models"

const initialState: DevicesReducer = {
  connected: [],
  drawerVisible: false,
}

export const devicesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setConnectedDevices, (state, action) => {
    state.connected = action.payload
  })
  builder.addCase(setCurrentDevice, (state, action) => {
    state.connected = state.connected.map((device) => ({
      ...device,
      active: device.path === action.payload,
    }))
  })
  builder.addCase(setDrawerVisibility, (state, action) => {
    state.drawerVisible = action.payload
  })
})
