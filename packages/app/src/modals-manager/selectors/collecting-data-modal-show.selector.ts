/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Renderer/store"
import { ModalsManagerState } from "App/modals-manager/reducers"
import { modalsManagerStateSelector } from "App/modals-manager/selectors/modals-manager-state.selector"

export const collectingDataModalShowSelector = createSelector<
  ReduxRootState,
  ModalsManagerState,
  boolean
>(
  modalsManagerStateSelector,
  ({ allModalsShowBlocked, collectingDataModalShow }) => {
    return !allModalsShowBlocked && collectingDataModalShow
  }
)
