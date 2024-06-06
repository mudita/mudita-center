/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getDevicesSelector } from "./get-devices.selector"
import { Device, DeviceState } from "core-device/models"

export const getFailedDevicesSelector = createSelector(
  getDevicesSelector,
  (devices): Device[] => {
    return devices.filter(({ state }) => state === DeviceState.Failed)
  }
)
