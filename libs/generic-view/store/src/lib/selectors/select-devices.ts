/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { selectGenericViewState } from "./select-generic-view-state"

export const selectDevices = createSelector(
  [selectGenericViewState],
  ({ devices }) => devices
)
