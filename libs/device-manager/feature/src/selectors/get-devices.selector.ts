/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { Device } from "core-device/models"
import { getCoreDevicesSelector } from "core-device/feature"

export const getDevicesSelector = createSelector(
  getCoreDevicesSelector,
  (coreDevices): Device[] => {
    // TODO: add api devices
    return coreDevices
  }
)
