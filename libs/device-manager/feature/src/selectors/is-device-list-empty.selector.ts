/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getDevicesSelector } from "./get-devices.selector"

export const isDeviceListEmpty = createSelector(
  getDevicesSelector,
  (devices): boolean => {
    return devices.length === 0
  }
)
