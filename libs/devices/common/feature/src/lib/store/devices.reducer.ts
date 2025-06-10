/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  setConnectingModalVisibility,
  setDevicesDrawerVisibility,
} from "./devices.actions"
import { DevicesReducer } from "devices/common/models"

const initialState: DevicesReducer = {
  connectingModalVisible: false,
  drawerVisible: false,
}

export const devicesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDevicesDrawerVisibility, (state, action) => {
    state.drawerVisible = action.payload
  })
  builder.addCase(setConnectingModalVisibility, (state, action) => {
    state.connectingModalVisible = action.payload
  })
})
