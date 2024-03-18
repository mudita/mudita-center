/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectActiveDeviceConfiguration } from "./active-device-configuration"

export const selectBackupLocation = createSelector(
  selectActiveDeviceConfiguration,
  (state: ReduxRootState) => state.settings.osBackupLocation,
  (deviceConfiguration, location) => {
    const { vendorId, productId } = deviceConfiguration?.apiConfig || {}
    const deviceDirectory = `${vendorId}_${productId}`
    return vendorId && productId ? `${location}/${deviceDirectory}` : location
  }
)
