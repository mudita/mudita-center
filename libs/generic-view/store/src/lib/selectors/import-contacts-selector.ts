/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const importContactsSelector = createSelector(
  [(state: ReduxRootState) => state.genericImport],
  (imports) => {
    if (!imports.currentImportProvider) return []

    return imports.providers[imports.currentImportProvider]?.contacts ?? []
  }
)
