/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { Device } from "core-device/models"
import { coreDeviceState } from "./core-device-state.selector"

export const getCoreDevicesSelector = createSelector(
  coreDeviceState,
  ({ devices }): Device[] => {
    return devices
  }
)
