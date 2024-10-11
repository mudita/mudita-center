/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { flashingState } from "./select-flashing-state.selector"

export const selectFlashingAbortController = createSelector(
  flashingState,
  (flashingState) => flashingState.abortController
)
