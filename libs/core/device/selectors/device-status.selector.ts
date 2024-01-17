/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { deviceStateSelector } from "Core/device/selectors/device-state.selector"
import { DeviceStatus } from "Core/device/reducers"

export const deviceStatusSelector = createSelector(
  deviceStateSelector,
  (deviceState): DeviceStatus | undefined => {
    return deviceState?.status
  }
)
