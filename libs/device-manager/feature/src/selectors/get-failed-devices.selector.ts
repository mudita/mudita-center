/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { AvailableDeviceProperties } from "device-manager/models"
import { getFailedCoreDevicesSelector } from "core-device/feature"
import { selectFailedDevices } from "generic-view/store"

export const getFailedDevicesSelector = createSelector(
  getFailedCoreDevicesSelector,
  selectFailedDevices,
  (failedCoreDevices, failedApiDevices): AvailableDeviceProperties[] => {
    return [...failedCoreDevices, ...Object.values(failedApiDevices)]
  }
)
