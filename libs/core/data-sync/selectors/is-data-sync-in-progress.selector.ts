/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { dataSyncStateSelector } from "Core/data-sync/selectors/data-sync-state.selector"
import { SynchronizationStatus } from "Core/data-sync/reducers"

export const isDataSyncInProgressSelector = createSelector(
  dataSyncStateSelector,
  (dataSyncState): boolean => {
    const { status } = dataSyncState
    return (
      status === SynchronizationStatus.Loading ||
      status === SynchronizationStatus.Cache
    )
  }
)
