/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getOverviewConfigRequest } from "device/feature"
import { OverviewConfig } from "Libs/device/models/src"
import { FeaturesActions } from "./featues-action-keys"

export const getOverviewConfig = createAsyncThunk<
  OverviewConfig,
  undefined,
  { state: ReduxRootState }
>(FeaturesActions.GetOverviewConfig, async (_, { rejectWithValue }) => {
  const response = await getOverviewConfigRequest()
  if (response.ok) {
    return response.data
  }
  return rejectWithValue(response.error)
})
