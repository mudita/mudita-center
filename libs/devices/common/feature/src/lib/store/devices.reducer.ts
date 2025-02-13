/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { SerialPortDeviceInfo } from "app-serialport/models"
import { setDevices } from "./devices.actions"

interface DevicesState {
  current: SerialPortDeviceInfo[]
}

const initialState: DevicesState = {
  current: [],
}

export const devicesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDevices, (state, action) => {
    state.current = action.payload
  })
})
