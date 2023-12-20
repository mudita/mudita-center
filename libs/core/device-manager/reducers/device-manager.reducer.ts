/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DeviceManagerState } from "Core/device-manager/reducers/device-manager.interface"
import { addDevice } from "Core/device-manager/actions/base.action"
import { mapToDevice } from "Core/device-manager/helpers/map-to-device"

export const initialState: DeviceManagerState = {
  devices: [],
  activeDeviceId: undefined,
}

export const deviceManagerReducer = createReducer<DeviceManagerState>(
  initialState,
  (builder) => {
    builder
      .addCase(setDiscoveryStatus, (state, action) => {
        return {
          ...state,
          discoveryStatus: action.payload,
        }
      })
      .addCase(addDevice, (state, action) => {
        const devices = [...state.devices]
        devices.push(mapToDevice(action.payload))

        return {
          ...state,
          devices,
        }
      })
  }
)
