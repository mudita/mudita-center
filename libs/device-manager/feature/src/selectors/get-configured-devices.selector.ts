/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { Device, DeviceState } from "core-device/models"
import { selectConfiguredDeviceIDs } from "generic-view/store"
import { DeviceType } from "device-protocol/models"
import { getDevicesSelector } from "./get-devices.selector"

export const getConfiguredDevicesSelector = createSelector(
  getDevicesSelector,
  selectConfiguredDeviceIDs,
  (devices, apiIds): Device[] => {
    return devices.filter(({ state, deviceType, id }) => {
      if (deviceType === DeviceType.APIDevice && apiIds.includes(id)) {
        return true
      }
      return state === DeviceState.Configured
    })
  }
)
