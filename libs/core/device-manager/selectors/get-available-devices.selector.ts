/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { Device } from "Core/device-manager/reducers/device-manager.interface"
import { getFailedDevicesSelector } from "Core/device-manager/selectors/get-failed-devices.selector"
import { getConfiguredDevicesSelector } from "Core/device-manager/selectors/get-configured-devices.selector"

export const getAvailableDevicesSelector = createSelector(
  getConfiguredDevicesSelector,
  getFailedDevicesSelector,
  (configuredDevices, failedDevices): Device[] => {
    return [...configuredDevices, ...failedDevices]
  }
)
