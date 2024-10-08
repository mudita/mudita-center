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
import logger from "Core/__deprecated__/main/utils/logger"
import { enhanceEntity } from "./helpers/enhance-entity"

export const updateEntityDataAction = createAsyncThunk<
  EntityData,
  {
    entitiesType: string
    entityId: EntityId
    data: EntityData
    deviceId: DeviceId
  },
  { state: ReduxRootState }
>(
  ActionName.UpdateEntityData,
  async (
    { entitiesType, entityId, data, deviceId },
    { rejectWithValue, getState }
  ) => {
    const response = await updateEntityDataRequest({
      entitiesType,
      entityId,
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
      !entities.data?.find(
        (entity) => entity[idFieldKey] === response.data.data[idFieldKey]
      )
    ) {
      logger.error(
        `Entity of type ${entitiesType} with id ${
          response.data.data[idFieldKey] as string
        } not found`
      )
      return rejectWithValue(undefined)
    }

    const computedFields =
      genericEntities[deviceId][entitiesType]?.config.computedFields || {}
    return enhanceEntity(response.data.data, { computedFields })
  }
)
