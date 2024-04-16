/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { generateMenu } from "generic-view/utils"

export const activeDeviceMenuItems = createSelector(
  [
    (state: ReduxRootState) => state.genericViews.activeDevice,
    (state: ReduxRootState) => state.genericViews.devicesConfiguration,
  ],
  (activeDevice, devicesConfiguration) => {
    if (activeDevice) {
      return devicesConfiguration[activeDevice].menuConfig
    }
    return undefined
  }
)

export const selectActiveDeviceMenuElements = createSelector(
  activeDeviceMenuItems,
  (menuConfig) => {
    return menuConfig && generateMenu(menuConfig)
  }
)
