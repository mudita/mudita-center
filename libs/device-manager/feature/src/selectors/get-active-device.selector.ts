/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { DeviceProperties } from "device-manager/models"
import { activeDeviceIdSelector } from "active-device-registry/feature"
import { getDevicesSelector } from "./get-devices.selector"

export const getActiveDevice = createSelector(
  getDevicesSelector,
  activeDeviceIdSelector,
  (devices, activeDeviceId): DeviceProperties | undefined => {
    return devices.find(({ id }) => id === activeDeviceId)
  }
)
