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
import { enhanceEntity } from "./helpers/enhance-entity"
import { AppError } from "Core/core/errors"

export type CreateEntityResponse = Awaited<
  ReturnType<ReturnType<typeof createEntityDataAction>>
>

export const createEntityDataAction = createAsyncThunk<
  EntityData,
  {
    entitiesType: string
    data: EntityData
    deviceId: DeviceId
    onSuccess?: () => Promise<void> | void
    onError?: () => Promise<void> | void
  },
  { state: ReduxRootState; rejectValue: AppError | undefined }
>(
  ActionName.CreateEntityData,
  async (
    { entitiesType, data, deviceId, onError, onSuccess },
    { rejectWithValue, getState }
  ) => {
    const response = await createEntityDataRequest({
      entitiesType,
      data,
      deviceId,
    })
    if (!response.ok) {
      await onError?.()
      return rejectWithValue(response.error)
    }

    const { genericEntities } = getState()
    const entities = genericEntities[deviceId]?.[entitiesType]
    const idFieldKey = entities?.idFieldKey
    if (!entities || !idFieldKey) {
      logger.error(
        `Entities of type ${entitiesType} for device ${deviceId} not found`
      )
      await onError?.()
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
      await onError?.()
      return rejectWithValue(undefined)
    }

    const computedFields =
      genericEntities[deviceId]?.[entitiesType]?.config?.computedFields || {}
    await onSuccess?.()
    return enhanceEntity(response.data.data, { computedFields })
  }
)
