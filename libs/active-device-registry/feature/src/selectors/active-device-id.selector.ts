/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { activeDeviceRegistryState } from "./active-device-registry-state.selector"

export const activeDeviceIdSelector = createSelector(
  activeDeviceRegistryState,
  (activeDeviceRegistryState): string | undefined => {
    return activeDeviceRegistryState.activeDeviceId
  }
)
