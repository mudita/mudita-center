/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { deviceStatusSelector } from "Core/device/selectors/device-status.selector"

export const deviceUnlockedStatusSelector = createSelector(
  deviceStatusSelector,
  (status): boolean | undefined | null => {
    return status?.unlocked
  }
)
