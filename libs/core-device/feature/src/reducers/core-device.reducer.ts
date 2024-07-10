/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { DeviceState } from "device-manager/models"
import { CoreDeviceState } from "core-device/models"
import {
  addDevice,
  removeDevice,
  configureDevice,
  setDeviceState,
} from "../actions"

export const initialState: CoreDeviceState = {
  devices: {},
}

export const coreDeviceReducer = createReducer<CoreDeviceState>(
  initialState,
  (builder) => {
    builder
      .addCase(addDevice, (state, action) => {
        state.devices[action.payload.id] = {
          caseColour: undefined,
          state: DeviceState.Connected,
          ...action.payload,
        }
      })
      .addCase(removeDevice, (state, action) => {
        delete state.devices[action.payload.id]
      })
      .addCase(configureDevice.fulfilled, (state, action) => {
        const id = action.payload.id
        const device = state.devices[id]
        state.devices[id] = {
          ...device,
          caseColour: action.payload.caseColour ?? device.caseColour,
          serialNumber: action.payload.serialNumber ?? device.serialNumber,
          state: DeviceState.Configured,
        }
      })
      .addCase(setDeviceState, (state, action) => {
        if (action.payload) {
          const id = action.payload.id
          const device = state.devices[id]
          const deviceState = action.payload.state
          state.devices[id] = {
            ...device,
            state: deviceState,
          }
        }
      })
  }
)
