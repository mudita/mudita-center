/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getActiveDevice } from "./get-active-device.selector"

export const isActiveDeviceAttachedSelector = createSelector(
  getActiveDevice,
  (device): boolean => {
    return device !== undefined
  }
)
