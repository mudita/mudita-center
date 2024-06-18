/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { deviceManagerState } from "./device-manager-state.selector"
import { Device } from "core-device/models"
import { getDevicesSelector } from "./get-devices.selector"

export const getActiveDevice = createSelector(
  getDevicesSelector,
  deviceManagerState,
  (devices, deviceManager): Device | undefined => {
    const { activeDeviceId } = deviceManager
    return devices.find(({ id }) => id === activeDeviceId)
  }
)
