/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { deviceManagerState } from "./device-manager-state.selector"

export const activeDeviceIdSelector = createSelector(
  deviceManagerState,
  (deviceManager): string | undefined => {
    return deviceManager.activeDeviceId
  }
)
