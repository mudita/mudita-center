/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateEntityDataRequest } from "device/feature"
import { EntityData, EntityId } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"

export const updateEntityDataAction = createAsyncThunk<
  EntityData,
  {
    entitiesType: string
    entityId: EntityId
    data: EntityData
    deviceId?: DeviceId
  },
  { state: ReduxRootState }
>(
  ActionName.UpdateEntityData,
  async ({ entitiesType, entityId, data, deviceId }, { rejectWithValue }) => {
    const response = await updateEntityDataRequest({
      entitiesType,
      entityId,
      data,
      deviceId,
    })

    if (!response.ok) {
      return rejectWithValue(response.error)
    }

    return response.data
  }
)
