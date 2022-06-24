/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { ModalsManagerState, ModalStateKey } from "App/modals-manager/reducers"
import { modalsManagerStateSelector } from "App/modals-manager/selectors/modals-manager-state.selector"

export const noModalsShowSelector = createSelector<
  ReduxRootState,
  ModalsManagerState,
  boolean
>(modalsManagerStateSelector, (state) => {
  return Object.keys(state).every((key) => !state[key as ModalStateKey])
})
