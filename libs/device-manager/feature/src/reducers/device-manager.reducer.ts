/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { DeviceManagerState } from "device-manager/models"
import {
  setActiveDevice,
  deactivateDevice,
  setSelectDeviceDrawerOpen,
} from "../actions"

export const initialState: DeviceManagerState = {
  activeDeviceId: undefined,
  selectDeviceDrawerOpen: false,
}

export const deviceManagerReducer = createReducer<DeviceManagerState>(
  initialState,
  (builder) => {
    builder
      .addCase(setActiveDevice.fulfilled, (state, action) => {
        return {
          ...state,
          activeDeviceId: action.payload,
        }
      })
      .addCase(deactivateDevice.fulfilled, (state) => {
        return {
          ...state,
          activeDeviceId: undefined,
        }
      })
      .addCase(setSelectDeviceDrawerOpen, (state, action) => {
        return {
          ...state,
          selectDeviceDrawerOpen: action.payload,
        }
      })
  }
)
