/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { setDevices } from "./devices.actions"
import { DevicesReducer } from "devices/common/models"

const initialState: DevicesReducer = {
  current: [],
}

export const devicesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDevices, (state, action) => {
    state.current = action.payload
  })
})
