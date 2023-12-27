/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import { readAllIndexes } from "Core/data-sync/actions/read-all-indexes.action"
import { DataSyncError, DataSyncEvent } from "Core/data-sync/constants"
import { indexAllRequest } from "Core/data-sync/requests"
import { deviceDataSelector } from "Core/device/selectors/device-data.selector"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { isPureDeviceData } from "Core/device/helpers/is-pure-device-data"
import { saveIndexRequest } from "Core/index-storage/requests"

export const updateAllIndexes = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(
  DataSyncEvent.UpdateAllIndexes,
  async (_, { dispatch, rejectWithValue, getState }) => {
    const data = deviceDataSelector(getState())
    if (!isPureDeviceData(data)) {
      return
    }
    const indexed = await indexAllRequest(data)

    if (!indexed) {
      return rejectWithValue(
        new AppError(
          DataSyncError.UpdateAllIndexes,
          "Update All Indexes fails:request"
        )
      )
    }

    await saveIndexRequest(data)

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
