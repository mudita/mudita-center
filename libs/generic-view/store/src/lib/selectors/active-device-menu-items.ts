/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { generateMenu } from "generic-view/utils"
import { selectActiveApiDeviceId } from "./select-active-api-device-id"
import { selectConfiguredDevices } from "./select-configured-devices"

export const activeDeviceMenuItems = createSelector(
  [selectActiveApiDeviceId, selectConfiguredDevices],
  (activeDeviceId, configuredDevices) => {
    if (activeDeviceId) {
      return configuredDevices[activeDeviceId].menuConfig
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
