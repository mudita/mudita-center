/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { generateMenu } from "generic-view/utils"
import { selectActiveDevice } from "./active-device"
import { selectConfiguredDevices } from "./select-configured-devices"

export const activeDeviceMenuItems = createSelector(
  [selectActiveDevice, selectConfiguredDevices],
  (activeDevice, configuredDevices) => {
    if (activeDevice) {
      return configuredDevices[activeDevice].menuConfig
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
