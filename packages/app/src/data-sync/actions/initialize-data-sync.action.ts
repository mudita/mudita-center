/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DataSyncEvent } from "App/data-sync/constants"
import { initializeDataSyncRequest } from "App/data-sync/requests/initialize-data-sync.request"
import { updateAllIndexes } from "App/data-sync"

export const initializeDataSync = createAsyncThunk<void, string>(
  DataSyncEvent.InitializeDataSync,
  async (token: string, { dispatch }) => {
    await initializeDataSyncRequest(token)
    dispatch(updateAllIndexes())
  }
)
