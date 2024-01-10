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

export const getFailedDevicesSelector = createSelector(
  deviceManagerState,
  (deviceManager): Device[] => {
    return deviceManager.devices.filter(
      ({ state }) => state === DeviceState.Failed
    )
  }
)
