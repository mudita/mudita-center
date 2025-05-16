/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { DeviceProperties } from "device-manager/models"
import { getCoreDevicesSelector } from "../../../../core-device/feature/src/selectors/get-core-devices.selector"
import { selectDevices } from "../../../../generic-view/store/src/lib/selectors/select-devices"

export const getDevicesSelector = createSelector(
  getCoreDevicesSelector,
  selectDevices,
  (coreDevices, apiDevices): DeviceProperties[] => {
    return [...coreDevices, ...Object.values(apiDevices)]
  }
)
