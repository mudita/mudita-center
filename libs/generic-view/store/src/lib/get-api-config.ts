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
import { ResultObject } from "Core/core/builder"
import { loadEntities } from "./entities/load-entities.action"

export const getAPIConfig = createAsyncThunk<
  { deviceId: string; apiConfig: ApiConfig },
  { deviceId: DeviceId; retry?: boolean },
  { state: ReduxRootState }
>(
  ActionName.GetConfig,
  async ({ deviceId, retry }, { rejectWithValue, dispatch }) => {
    const retryLimit = 25
    let retires = 0
    let response: ResultObject<ApiConfig>
    do {
      response = await getAPIConfigRequest(deviceId)
    } while (retry && retires++ < retryLimit && !response.ok)

    if (response.ok) {
      const menuResponse = await dispatch(getMenuConfig({ deviceId }))

      if (menuResponse.meta.requestStatus === "fulfilled") {
        await dispatch(
          getAllFeatures({ deviceId, features: response.data.features })
        )
        dispatch(
          loadEntities({
            deviceId,
            entitiesTypes: response.data.entityTypes,
          })
        )
      }

      return { deviceId, apiConfig: response.data }
    }
    return rejectWithValue(response.error)
  }
)
