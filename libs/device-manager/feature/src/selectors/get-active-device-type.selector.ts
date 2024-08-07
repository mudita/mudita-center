/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getActiveDevice } from "./get-active-device.selector"
import { DeviceType } from "device-protocol/models"

export const getActiveDeviceTypeSelector = createSelector(
  getActiveDevice,
  (device): DeviceType | undefined => {
    return device?.deviceType
  }
)
