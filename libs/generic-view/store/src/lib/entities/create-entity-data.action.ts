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
import logger from "Core/__deprecated__/main/utils/logger"

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
  async ({ entitiesType, data, deviceId }, { rejectWithValue, getState }) => {
    const response = await createEntityDataRequest({
      entitiesType,
      data,
      deviceId,
    })
    if (!response.ok) {
      return rejectWithValue(response.error)
    }

    const { genericEntities } = getState()
    const entities = genericEntities[deviceId][entitiesType]
    const idFieldKey = entities?.idFieldKey
    if (!entities || !idFieldKey) {
      logger.error(
        `Entities of type ${entitiesType} for device ${deviceId} not found`
      )
      return rejectWithValue(undefined)
    }
    if (
      entities.data?.find(
        (entity) => entity[idFieldKey] === response.data.data[idFieldKey]
      )
    ) {
      logger.error(
        `Entity of type ${entitiesType} with id ${
          response.data.data[idFieldKey] as string
        } already exists`
      )
      return rejectWithValue(undefined)
    }

    return response.data.data
  }
)
