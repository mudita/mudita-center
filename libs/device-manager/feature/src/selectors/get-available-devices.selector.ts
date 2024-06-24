/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { DeviceProperties } from "device-manager/models"
import { getIdentifiedDevicesSelector } from "./get-identified-devices.selector"
import { getConfiguredDevicesSelector } from "./get-configured-devices.selector"
import { getFailedDevicesSelector } from "./get-failed-devices.selector"

export const getAvailableDevicesSelector = createSelector(
  getIdentifiedDevicesSelector,
  getConfiguredDevicesSelector,
  getFailedDevicesSelector,
  (identifiedDevices, configuredDevices, failedDevices): DeviceProperties[] => {
    return [...identifiedDevices, ...configuredDevices, ...failedDevices]
  }
)
