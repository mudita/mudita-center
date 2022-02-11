/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DataSyncEvent } from "App/data-sync/constants"
import { initializeDataSyncRequest } from "App/data-sync/requests"
import { updateAllIndexes } from "App/data-sync/actions/update-all-indexes.action"
import { readAllIndexes } from "App/data-sync/actions/read-all-indexes.action"
import { setCacheState } from "App/data-sync/actions/base-app.action"

export const initializeDataSync = createAsyncThunk<void, string>(
  DataSyncEvent.InitializeDataSync,
  async (token: string, { dispatch }) => {
    const cache = await initializeDataSyncRequest(token)
    dispatch(updateAllIndexes())

    if (cache) {
      dispatch(readAllIndexes())
      dispatch(setCacheState())
    }
  }
)
