/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { AvailableDeviceProperties } from "device-manager/models"
import { deviceManagerState } from "./device-manager-state.selector"
import { getDevicesSelector } from "./get-devices.selector"

export const getActiveDevice = createSelector(
  getDevicesSelector,
  deviceManagerState,
  (devices, deviceManager): AvailableDeviceProperties | undefined => {
    const { activeDeviceId } = deviceManager
    return devices.find(({ id }) => id === activeDeviceId)
  }
)
