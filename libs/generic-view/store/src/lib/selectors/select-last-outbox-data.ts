/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const selectLastOutboxData = createSelector(
  [(state: ReduxRootState) => state.genericViews.lastOutboxData],
  (lastOutboxData) => {
    return lastOutboxData
  }
)
