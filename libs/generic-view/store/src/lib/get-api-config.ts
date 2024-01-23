/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getAPIConfigRequest } from "device/feature"
import { ApiConfig } from "device/models"
import { ActionName } from "./action-names"
import { getAllFeatures } from "./features/get-all-features"
import { getMenuConfig } from "./get-menu-config"

export const getAPIConfig = createAsyncThunk<
  { deviceId: string; apiConfig: ApiConfig },
  { deviceId: DeviceId },
  { state: ReduxRootState }
>(ActionName.GetConfig, async ({ deviceId }, { rejectWithValue, dispatch }) => {
  const response = await getAPIConfigRequest(deviceId)
  console.log(response)
  if (response.ok) {
    dispatch(getMenuConfig({ deviceId }))
    dispatch(getAllFeatures({ deviceId, features: response.data.features }))
    return { deviceId, apiConfig: response.data }
  }
  return rejectWithValue(response.error)
})
