/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { generateMenu } from "generic-view/utils"
import { selectActiveDeviceConfiguration } from "./active-device-configuration"

export const activeDeviceMenuItems = createSelector(
  [selectActiveDeviceConfiguration],
  (activeDeviceConfiguration) => {
    return activeDeviceConfiguration
      ? activeDeviceConfiguration.menuConfig
      : undefined
  }
)

export const selectActiveDeviceMenuElements = createSelector(
  activeDeviceMenuItems,
  (menuConfig) => {
    return menuConfig && generateMenu(menuConfig)
  }
)
