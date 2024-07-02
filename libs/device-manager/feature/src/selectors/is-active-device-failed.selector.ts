/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { DeviceState } from "device-manager/models"
import { getActiveDevice } from "./get-active-device.selector"

export const isActiveDeviceFailedSelector = createSelector(
  getActiveDevice,
  (activeDevice): boolean => {
    return activeDevice?.state === DeviceState.Failed
  }
)
