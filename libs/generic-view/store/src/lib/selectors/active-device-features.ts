/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { selectActiveDeviceConfiguration } from "./active-device-configuration"

export const selectActiveDeviceFeatures = createSelector(
  selectActiveDeviceConfiguration,
  (activeDeviceConfiguration) => {
    return activeDeviceConfiguration?.features
  }
)
