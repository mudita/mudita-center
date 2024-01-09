/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import {
  Device,
  DeviceManagerState,
  DeviceState,
} from "Core/device-manager/reducers/device-manager.interface"
import {
  addDevice,
  removeDevice,
} from "Core/device-manager/actions/base.action"
import { mapToDevice } from "Core/device-manager/helpers/map-to-device"
import { setActiveDevice } from "Core/device-manager/actions/set-active-device.action"
import { configureDevice } from "Core/device-manager/actions/configure-device.action"

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
      .addCase(removeDevice, (state, action) => {
        const devices = state.devices.filter(
          ({ id }) => id !== action.payload.id
        )

        return {
          ...state,
          devices,
        }
      })
      .addCase(setActiveDevice.fulfilled, (state, action) => {
        return {
          ...state,
          activeDeviceId: action.payload,
        }
      })
      .addCase(configureDevice.fulfilled, (state, action) => {
        const devices = state.devices.reduce((prev, device) => {
          if (device.id === action.payload.id) {
            return [
              ...prev,
              {
                ...device,
                caseColour: action.payload.caseColour,
                state: DeviceState.Configured,
              },
            ]
          } else {
            return [...prev, device]
          }
        }, [] as Device[])

        return {
          ...state,
          devices,
        }
      })
  }
)
