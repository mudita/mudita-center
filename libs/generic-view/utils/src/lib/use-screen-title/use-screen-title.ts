/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { createSelector } from "reselect"

const screenTitleSelector = createSelector(
  (state: ReduxRootState) => state.genericViews?.views,
  (state: ReduxRootState, viewKey: string) => viewKey,
  (views, viewKey) => views?.[viewKey]?.layout?.main?.screenTitle
)

export const useScreenTitle = (viewKey: string) => {
  return useSelector((state: ReduxRootState) => {
    return screenTitleSelector(state, viewKey)
  })
}
