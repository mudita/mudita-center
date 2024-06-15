/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { selectConfiguredDevices } from "./select-configured-devices"
import { selectActiveApiDeviceId } from "./select-active-api-device-id"

export const selectActiveDeviceConfiguration = createSelector(
  [selectActiveApiDeviceId, selectConfiguredDevices],
  (activeDeviceId, devicesConfiguration) => {
    if (activeDeviceId) {
      return devicesConfiguration[activeDeviceId]
    }
    return undefined
  }
)
