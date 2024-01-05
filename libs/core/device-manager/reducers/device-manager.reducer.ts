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
import { DeviceType } from "Core/device"

export const initialState: DeviceManagerState = {
  devices: [
    {
      id: "0422130000909",
      path: "/dev/tty.usbmodem04221300009092",
      // serialNumber: "0422130000909",
      serialNumber: undefined,
      deviceType: DeviceType.MuditaHarmony,
      state: DeviceState.Connected,
    },
    {
      id: "0121480001897",
      path: "/dev/tty.usbmodem04214800018971",
      serialNumber: "0121480001897",
      deviceType: DeviceType.MuditaPure,
      state: DeviceState.Connected,
    },
    {
      id: "0421480001897",
      path: "/dev/tty.usbmodem04214800018971",
      serialNumber: "0421480001897",
      deviceType: DeviceType.MuditaKompakt,
      state: DeviceState.Connected,
    },
    {
      id: "1422130000909",
      path: "/dev/tty.usbmodem04221300009092",
      serialNumber: "1422130000909",
      deviceType: DeviceType.MuditaHarmony,
      state: DeviceState.Connected,
    },
    {
      id: "2421480001897",
      path: "/dev/tty.usbmodem04214800018971",
      serialNumber: "2421480001897",
      deviceType: DeviceType.MuditaHarmony,
      state: DeviceState.Connected,
    },
    {
      id: "0021480001897",
      path: "/dev/tty.usbmodem04214800018971",
      serialNumber: "0021480001897",
      deviceType: DeviceType.MuditaPure,
      state: DeviceState.Connected,
    },
    {
      id: "3421480001897",
      path: "/dev/tty.usbmodem04214800018971",
      serialNumber: "3421480001897",
      deviceType: DeviceType.MuditaHarmony,
      state: DeviceState.Connected,
    },
    {
      id: "0321480001897",
      path: "/dev/tty.usbmodem04214800018971",
      serialNumber: "0321480001897",
      deviceType: DeviceType.MuditaPure,
      state: DeviceState.Connected,
    },
  ],
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
  }
)
