/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { deviceManagerState } from "Core/device-manager/selectors/device-manager-state.selector"
import {
  Device,
  DeviceState,
} from "Core/device-manager/reducers/device-manager.interface"
import { selectConfiguredDeviceIDs } from "generic-view/store"
import { DeviceType } from "Core/device/constants"

export const getConfiguredDevicesSelector = createSelector(
  deviceManagerState,
  selectConfiguredDeviceIDs,
  (deviceManager, apiIds): Device[] => {
    console.log(apiIds)
    return deviceManager.devices.filter(({ state, deviceType, id }) => {
      if (deviceType === DeviceType.APIDevice && apiIds.includes(id)) {
        return true
      }
      return state === DeviceState.Configured
    })
  }
)
