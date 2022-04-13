/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { DataSyncEvent } from "App/data-sync/constants"

export const setDataSyncInitialized = createAction(
  DataSyncEvent.SetDataSyncInitialized
)
export const setDataSyncInitializing = createAction(
  DataSyncEvent.InitializingDataSync
)
export const setDataSyncInitializingError = createAction<Error | null>(
  DataSyncEvent.InitializingDataError
)
export const setCacheState = createAction(DataSyncEvent.SetCacheState)
export const setLoadedState = createAction(DataSyncEvent.SetLoadedState)
export const setDataSyncInitState = createAction(
  DataSyncEvent.SetDataSyncInitState
)
