/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { modalsManagerStateSelector } from "Core/modals-manager/selectors/modals-manager-state.selector"
import { initialModalsState, ModalStateKey } from "Core/modals-manager/reducers"

export const noModalsShowSelector = createSelector(
  modalsManagerStateSelector,
  (state): boolean => {
    return Object.keys(initialModalsState).every((key) => !state[key as ModalStateKey])
  }
)
