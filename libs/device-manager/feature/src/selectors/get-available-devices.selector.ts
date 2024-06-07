/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { Device } from "core-device/models"
import { getFailedDevicesSelector } from "./get-failed-devices.selector"
import { getConfiguredDevicesSelector } from "./get-configured-devices.selector"

export const getAvailableDevicesSelector = createSelector(
  getConfiguredDevicesSelector,
  getFailedDevicesSelector,
  (configuredDevices, failedDevices): Device[] => {
    return [...configuredDevices, ...failedDevices]
  }
)
