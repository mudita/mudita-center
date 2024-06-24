/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { DeviceProperties } from "device-manager/models"
import { selectConfiguredDevices } from "generic-view/store"

export const getConfiguredDevicesSelector = createSelector(
  selectConfiguredDevices,
  (apiDevices): DeviceProperties[] => {
    return [...Object.values(apiDevices)]
  }
)
