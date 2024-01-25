/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { createSelector } from "reselect"

const screenTitleSelector = createSelector(
  (state: ReduxRootState) => state.genericViews.activeDevice,
  (state: ReduxRootState) => state.genericViews.devicesConfiguration,
  (state: ReduxRootState, viewKey: string) => viewKey,
  (activeDevice, devices, viewKey) => {
    const features = devices[activeDevice as keyof typeof devices]?.features
    return features?.[viewKey as keyof typeof features]?.config?.main
      .screenTitle
  }
)

export const useScreenTitle = (viewKey: string) => {
  return useSelector((state: ReduxRootState) => {
    return screenTitleSelector(state, viewKey)
  })
}
