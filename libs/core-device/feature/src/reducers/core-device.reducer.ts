/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { DeviceState } from "device-manager/models"
import { Device, CoreDeviceState } from "core-device/models"
import {
  addDevice,
  removeDevice,
  identifyDevice,
  setDeviceState,
} from "../actions"

export const initialState: CoreDeviceState = {
  devices: [],
}

export const coreDeviceReducer = createReducer<CoreDeviceState>(
  initialState,
  (builder) => {
    builder
      .addCase(addDevice, (state, action) => {
        const devices = [...state.devices]
        devices.push({
          caseColour: undefined,
          state: DeviceState.Connected,
          ...action.payload,
        })

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
      .addCase(identifyDevice.fulfilled, (state, action) => {
        const devices = state.devices.reduce((prev, device) => {
          const payload = action.payload
          if (device.id === payload.id) {
            return [
              ...prev,
              {
                ...device,
                caseColour: payload.caseColour ?? device.caseColour,
                serialNumber: payload.serialNumber ?? device.serialNumber,
                state: DeviceState.Identified,
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
      .addCase(setDeviceState, (state, action) => {
        if (!action.payload) {
          return { ...state }
        }

        const devices = state.devices.reduce((prev, device) => {
          const id = action.payload.id
          const deviceState = action.payload.state
          if (device.id === id) {
            return [
              ...prev,
              {
                ...device,
                state: deviceState,
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
