/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DataSyncEvent } from "App/data-sync/constants"
import { indexAllRequest } from "App/data-sync/requests"
import { readAllIndexes } from "App/data-sync/actions/read-all-indexes.action"
import { UpdateAllIndexesError } from "App/data-sync/errors"

export const updateAllIndexes = createAsyncThunk<void, void>(
  DataSyncEvent.UpdateAllIndexes,
  async (_, { dispatch, rejectWithValue }) => {
    await indexAllRequest()

    const action = await dispatch(readAllIndexes())

    if (action.payload instanceof Error) {
      return rejectWithValue(
        new UpdateAllIndexesError("Update All Indexes fails")
      )
    } else {
      return
    }
  }
)
