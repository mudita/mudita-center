/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "app-store-types"

export const selectCurrentDevices = createSelector(
  (state: RootState) => state.devices,
  (devices) => devices.current
)
