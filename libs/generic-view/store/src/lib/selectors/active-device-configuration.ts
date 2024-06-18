/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { selectConfiguredDevices } from "./select-configured-devices"
import { selectActiveDevice } from "./active-device"

export const selectActiveDeviceConfiguration = createSelector(
  [selectActiveDevice, selectConfiguredDevices],
  (activeDevice, devicesConfiguration) => {
    if (activeDevice) {
      return devicesConfiguration[activeDevice]
    }
    return undefined
  }
)
