/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import delayResponse from "@appnroll/delay-response"
import { AppError } from "Core/core/errors"
import { readAllIndexes } from "Core/data-sync/actions/read-all-indexes.action"
import { DataSyncError, DataSyncEvent } from "Core/data-sync/constants"
import { indexAllRequest } from "Core/data-sync/requests"
import { deviceDataSelector } from "Core/device/selectors/device-data.selector"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { isPureDeviceData } from "Core/device/helpers/is-pure-device-data"
import { saveIndexRequest } from "Core/index-storage/requests"

/***
 * `shouldDelay` - Specifies whether to delay the process.
 * @param {boolean} shouldDelay - Set to `true` to introduce a delay.
 *
 * Asynchronously updates all indexes. If `shouldDelay` is `true`,
 * the process is delayed to ensure adequate time between attempts,
 * critical for proper device handling.
***/

export const updateAllIndexes = createAsyncThunk<
  void,
  boolean | undefined,
  { state: ReduxRootState }
>(
  DataSyncEvent.UpdateAllIndexes,
  async (shouldDelay = false, { dispatch, rejectWithValue, getState }) => {
    if(shouldDelay){
      await delayResponse(Promise.resolve(),30000)
    }
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
