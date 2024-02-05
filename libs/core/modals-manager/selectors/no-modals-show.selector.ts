/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ModalsManagerState, ModalStateKey } from "Core/modals-manager/reducers"
import { modalsManagerStateSelector } from "Core/modals-manager/selectors/modals-manager-state.selector"

export const noModalsShowSelector = createSelector<
  ReduxRootState,
  ModalsManagerState,
  boolean
>(modalsManagerStateSelector, (state) => {
  return Object.keys(state).every((key) => !state[key as ModalStateKey])
})
