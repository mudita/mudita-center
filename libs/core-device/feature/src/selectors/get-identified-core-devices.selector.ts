/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { Device } from "core-device/models"
import { DeviceState } from "device-manager/models"
import { getCoreDevicesSelector } from "./get-core-devices.selector"

export const getIdentifiedCoreDevicesSelector = createSelector(
  getCoreDevicesSelector,
  (devices): Device[] => {
    return devices.filter(({ state }) => state === DeviceState.Identified)
  }
)
