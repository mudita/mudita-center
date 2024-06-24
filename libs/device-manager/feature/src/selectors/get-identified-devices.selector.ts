/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { DeviceProperties } from "device-manager/models"
import { selectIdentifiedDevices } from "generic-view/store"
import { getIdentifiedCoreDevicesSelector } from "core-device/feature"

export const getIdentifiedDevicesSelector = createSelector(
  getIdentifiedCoreDevicesSelector,
  selectIdentifiedDevices,
  (coreDevices, apiDevices): DeviceProperties[] => {
    return [...coreDevices, ...Object.values(apiDevices)]
  }
)
