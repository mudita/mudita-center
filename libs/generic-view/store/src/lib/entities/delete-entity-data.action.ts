/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { deleteEntityDataRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { EntityId } from "device/models"

export const deleteEntityDataAction = createAsyncThunk<
  undefined,
  {
    entitiesType: string
    entityId: EntityId
    deviceId: DeviceId
  },
  { state: ReduxRootState }
>(
  ActionName.DeleteEntityData,
  async ({ entitiesType, entityId, deviceId }, { rejectWithValue }) => {
    const response = await deleteEntityDataRequest({
      entitiesType,
      entityId,
      deviceId,
    })

    if (!response.ok) {
      return rejectWithValue(response.error)
    }

    return
  }
)
