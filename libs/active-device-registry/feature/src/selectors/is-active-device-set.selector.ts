/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { activeDeviceIdSelector } from "./active-device-id.selector"

export const isActiveDeviceSet = createSelector(
  activeDeviceIdSelector,
  (activeDeviceId): boolean => {
    return activeDeviceId !== undefined
  }
)
