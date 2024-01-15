/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { getOverviewDataRequest } from "device/feature"
import { OverviewData } from "Libs/device/models/src"

export const getOverviewData = createAsyncThunk<
  OverviewData,
  undefined,
  { state: ReduxRootState }
>(FeaturesActions.GetOverviewData, async (_, { rejectWithValue }) => {
  const response = await getOverviewDataRequest()
  if (response.ok) {
    return response.data
  }
  return rejectWithValue(response.error)
})
