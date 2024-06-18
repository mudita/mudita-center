/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { DeviceBaseProperties } from "device-protocol/models"
import { getCoreDevicesSelector } from "core-device/feature"
import { selectDevices } from "generic-view/store"

export const getDevicesSelector = createSelector(
  getCoreDevicesSelector,
  selectDevices,
  (coreDevices, apiDevices): DeviceBaseProperties[] => {
    return [...coreDevices, ...Object.values(apiDevices)]
  }
)
