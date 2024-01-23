/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { deviceManagerState } from "Core/device-manager/selectors/device-manager-state.selector"

export const isDeviceListEmpty = createSelector(
  deviceManagerState,
  (deviceManager): boolean => {
    return deviceManager.devices.length === 0
  }
)
