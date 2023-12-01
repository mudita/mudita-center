/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { readAllIndexes } from "App/data-sync/actions/read-all-indexes.action"
import { DataSyncError, DataSyncEvent } from "App/data-sync/constants"
import { indexAllRequest } from "App/data-sync/requests"

export const updateAllIndexes = createAsyncThunk<void, void>(
  DataSyncEvent.UpdateAllIndexes,
  async (_, { dispatch, rejectWithValue }) => {
    const indexed = await indexAllRequest()

    if (!indexed) {
      return rejectWithValue(
        new AppError(
          DataSyncError.UpdateAllIndexes,
          "Update All Indexes fails:request"
        )
      )
    }

    const action = await dispatch(readAllIndexes())

    if (action.payload instanceof Error) {
      return rejectWithValue(
        new AppError(
          DataSyncError.UpdateAllIndexes,
          "Update All Indexes fails:read indexes"
        )
      )
    } else {
      return
    }
  }
)
