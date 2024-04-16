/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"

import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const selectConfiguredDeviceIDs = createSelector(
  [(state: ReduxRootState) => state.genericViews.devicesConfiguration],
  (devices) => {
    return Object.entries(devices)
      .map(([id, data]) => {
        if (data.apiConfig) {
          return id
        }
        return null
      })
      .filter(Boolean)
  }
)
