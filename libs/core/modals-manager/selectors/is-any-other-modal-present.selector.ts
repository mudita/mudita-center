/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { modalsManagerStateSelector } from "Core/modals-manager"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const isAnyOtherModalPresentSelector = createSelector(
  modalsManagerStateSelector,
  (_: ReduxRootState, id: string) => id,
  ({ visibleModals }, id): boolean => {
    return visibleModals.filter((modal) => modal.id !== id).some(({ isPresent }) => isPresent)
  }
)
