/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { DeviceProperties } from "device-manager/models"
import { getFailedCoreDevicesSelector } from "../../../../core-device/feature/src/selectors/get-failed-core-devices.selector"
import { selectFailedDevices } from "../../../../generic-view/store/src/lib/selectors/select-failed-devices"

export const getFailedDevicesSelector = createSelector(
  getFailedCoreDevicesSelector,
  selectFailedDevices,
  (failedCoreDevices, failedApiDevices): DeviceProperties[] => {
    return [...failedCoreDevices, ...Object.values(failedApiDevices)]
  }
)
