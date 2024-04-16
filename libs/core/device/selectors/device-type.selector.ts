/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { DeviceType } from "Core/device/constants"
import { deviceStateSelector } from "Core/device/selectors/device-state.selector"

export const deviceTypeSelector = createSelector(
  deviceStateSelector,
  (deviceState): DeviceType | null => {
    return deviceState?.deviceType ?? null
  }
)
