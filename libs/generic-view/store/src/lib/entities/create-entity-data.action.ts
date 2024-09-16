/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { createEntityDataRequest } from "device/feature"
import { EntityData } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"

export const createEntityDataAction = createAsyncThunk<
  EntityData,
  {
    entitiesType: string
    data: EntityData
    deviceId: DeviceId
  },
  { state: ReduxRootState }
>(
  ActionName.CreateEntityData,
  async ({ entitiesType, data, deviceId }, { rejectWithValue }) => {
    const response = await createEntityDataRequest({
      entitiesType,
      data,
      deviceId,
    })

    if (!response.ok) {
      return rejectWithValue(response.error)
    }

    return response.data
  }
)
