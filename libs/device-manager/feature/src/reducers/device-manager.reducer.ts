/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { DeviceManagerState } from "device-manager/models"
import {
  setSelectDeviceDrawerOpen,
} from "../actions"

export const initialState: DeviceManagerState = {
  selectDeviceDrawerOpen: false,
}

export const deviceManagerReducer = createReducer<DeviceManagerState>(
  initialState,
  (builder) => {
    builder
      .addCase(setSelectDeviceDrawerOpen, (state, action) => {
        return {
          ...state,
          selectDeviceDrawerOpen: action.payload,
        }
      })
  }
)
