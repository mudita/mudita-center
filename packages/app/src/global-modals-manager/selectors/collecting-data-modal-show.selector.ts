/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Renderer/store"
import { GlobalModalsManagerState } from "App/global-modals-manager/reducers"
import { globalModalsManagerStateSelector } from "App/global-modals-manager/selectors/global-modals-manager-state.selector"

export const collectingDataModalShowSelector = createSelector<
  ReduxRootState,
  GlobalModalsManagerState,
  boolean
>(
  globalModalsManagerStateSelector,
  ({ allModalsShowBlocked, collectingDataModalShow }) => {
    return !allModalsShowBlocked && collectingDataModalShow
  }
)
