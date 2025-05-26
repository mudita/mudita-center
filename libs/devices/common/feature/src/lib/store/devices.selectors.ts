/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "app-store/models"

export const selectConnectedDevices = createSelector(
  (state: AppState) => state.devices,
  (devices) => {
    return devices.connected
  }
)

export const selectCurrentDevice = createSelector(
  selectConnectedDevices,
  (devices) => {
    return devices.find((device) => device.active)
  }
)

export const selectDrawerVisibility = createSelector(
  (state: AppState) => state.devices,
  (devices) => {
    return devices.drawerVisible
  }
)
