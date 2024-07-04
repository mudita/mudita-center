/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { createSelector } from "@reduxjs/toolkit"

export const selectDataMigrationPureDbIndexing = createSelector(
  (state: ReduxRootState) => state.dataMigration.pureDbIndexing,
  (indexing) => indexing
)
