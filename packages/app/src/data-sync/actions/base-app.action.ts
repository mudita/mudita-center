/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { DataSyncEvent } from "App/data-sync/constants"

export const setDataSyncInitialized = createAction(
  DataSyncEvent.SetDataSyncInitialized
)
export const setCacheState = createAction(DataSyncEvent.SetCacheState)
