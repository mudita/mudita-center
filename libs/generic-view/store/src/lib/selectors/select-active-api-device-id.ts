/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { activeDeviceIdSelector } from "active-device-registry/feature"
import { selectDevices } from "./select-devices"

export const selectActiveApiDeviceId = createSelector(
  [selectDevices, activeDeviceIdSelector],
  (devices, activeDeviceId) => {
    if (activeDeviceId && devices[activeDeviceId]) {
      return activeDeviceId
    } else {
      return undefined
    }
  }
)
