/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { deleteEntitiesDataRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { EntityId } from "device/models"
import { difference } from "lodash"

export const deleteEntityDataAction = createAsyncThunk<
  EntityId[],
  {
    entitiesType: string
    ids: EntityId[]
    deviceId: DeviceId
  },
  { state: ReduxRootState }
>(
  ActionName.DeleteEntityData,
  async ({ entitiesType, ids, deviceId }, { rejectWithValue }) => {
    const response = await deleteEntitiesDataRequest({
      entitiesType,
      ids,
      deviceId,
    })
    if (!response.ok) {
      return rejectWithValue(response.error)
    }
    if (response.data?.failedIds) {
      // TODO: Handle partial deletion of entities
      return difference(ids, response.data.failedIds)
    }
    return ids
  }
)
