/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const screenTitleSelector = createSelector(
  (state: ReduxRootState) => state.genericViews.activeDevice,
  (state: ReduxRootState) => state.genericViews.devicesConfiguration,
  (state: ReduxRootState, viewKey: string) => viewKey,
  (activeDevice, devices, viewKey) => {
    const features = devices[activeDevice as keyof typeof devices]?.features
    return features?.[viewKey as keyof typeof features]?.config?.main
      .screenTitle
  }
)
