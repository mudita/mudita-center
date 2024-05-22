/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  DiscoveryDeviceState,
  DiscoveryStatus,
} from "Core/discovery-device/reducers/discovery-device.interface"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"

export const initialState: DiscoveryDeviceState = {
  discoveryStatus: DiscoveryStatus.Idle,
}

export const discoveryDeviceReducer = createReducer<DiscoveryDeviceState>(
  initialState,
  (builder) => {
    builder.addCase(setDiscoveryStatus, (state, action) => {
      return {
        ...state,
        discoveryStatus: action.payload,
      }
    })
  }
)
