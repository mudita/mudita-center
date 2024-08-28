/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { DeviceType } from "device-protocol/models"
import { isDeviceLockedErrorSelector } from "generic-view/store"
import { getActiveDevice } from "./get-active-device.selector"

export const isActiveApiDeviceLockedSelector = createSelector(
  getActiveDevice,
  isDeviceLockedErrorSelector,
  (activeDevice, deviceLockedError): boolean => {
    return (
      activeDevice?.deviceType === DeviceType.APIDevice && deviceLockedError
    )
  }
)
