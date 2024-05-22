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

    const contacts = [
      ...(imports.providers[imports.currentImportProvider]?.contacts ?? []),
    ]

    return contacts?.sort((a, b) => {
      const aName = a.firstName || a.lastName || ""
      const bName = b.firstName || b.lastName || ""
      return aName?.localeCompare(bName)
    })
  }
)

export const importContactsErrorSelector = createSelector(
  (state: ReduxRootState) => state.genericImport.providers,
  (state: ReduxRootState) => state.genericImport.currentImportProvider,
  (providers, currentProvider) => {
    return currentProvider ? providers[currentProvider]?.error : undefined
  }
)
