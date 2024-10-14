/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SynchronizeTimeEvent } from "../constants/event.constant"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getTimeRequest } from "Core/time-synchronization/requests/get-time.request"

export const getTime = createAsyncThunk<
  Date,
  undefined,
  { state: ReduxRootState }
>(SynchronizeTimeEvent.Get, async (_, { rejectWithValue }) => {
  const response = await getTimeRequest()
  if (response.error) {
    return rejectWithValue(response.error)
  }
  return new Date(response.data)
})
