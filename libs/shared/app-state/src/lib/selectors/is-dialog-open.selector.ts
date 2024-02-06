/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { appStateSelector } from "./app-state.selector"

export const isDialogOpenSelector = createSelector(
  appStateSelector,
  ({ dialogOpen }): boolean => dialogOpen
)
