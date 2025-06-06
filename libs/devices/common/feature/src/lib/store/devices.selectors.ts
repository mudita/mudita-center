/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { AppStore } from "app-store/models"

export const selectDevicesDrawerVisibility = createSelector(
  (state: AppStore) => state.devices,
  (devices) => {
    return devices.drawerVisible
  }
)

export const selectConnectingModalVisibility = createSelector(
  (state: AppStore) => state.devices,
  (devices) => {
    return devices.connectingModalVisible
  }
)
