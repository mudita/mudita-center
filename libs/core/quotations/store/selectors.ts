/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { createSelector } from "reselect"

export const selectQuotations = createSelector(
  (state: ReduxRootState) => state.quotations,
  (quotations) => quotations.items
)

export const selectSelectedQuotations = createSelector(
  (state: ReduxRootState) => state.quotations,
  (quotations) => quotations.selectedItems
)
