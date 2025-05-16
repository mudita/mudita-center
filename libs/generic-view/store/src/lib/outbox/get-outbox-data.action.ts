/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getOutboxDataRequest } from "device/feature"
import { Outbox } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { AppError } from "Core/core/errors"
import { ActionName } from "../action-names"
import { getSingleFeatures } from "../features/get-single-feature"
import { getSingleFeatureData } from "../features/get-single-feature-data"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"
import { setLastOutboxData, setLastRefresh } from "../views/actions"
import { getEntityDataAction } from "../entities/get-entity-data.action"
import { deleteEntityData, setEntityData } from "../entities/actions"
import { getEntitiesMetadataAction } from "../entities/get-entities-metadata.action"

export const getOutboxData = createAsyncThunk<
  {
    deviceId: DeviceId
    data: Outbox
    timestamp: number
  },
  { deviceId: DeviceId },
  { state: ReduxRootState; rejectValue: AppError }
>(
  ActionName.GetOutboxData,
  async ({ deviceId }, { rejectWithValue, dispatch, getState }) => {
    const response = await getOutboxDataRequest(deviceId)

    if (selectActiveApiDeviceId(getState()) === deviceId) {
      dispatch(setLastRefresh(new Date().getTime()))
    }

    if (!response.ok) {
      return rejectWithValue(response.error)
    }

    if (response.data.features) {
      const featuresToFullReload = response.data.features
      const dataToReload = response.data.data.filter((feature) => {
        return !featuresToFullReload.includes(feature)
      })

      for (const feature of featuresToFullReload) {
        await dispatch(getSingleFeatures({ deviceId, feature }))
      }

      for (const feature of dataToReload) {
        await dispatch(getSingleFeatureData({ deviceId, feature }))
      }
    }

    if (response.data.entities && response.data.entities.length > 0) {
      const uniqueEntityTypes = new Set(
        response.data.entities.map((entity) => entity.entityType)
      )

      for (const entitiesType of uniqueEntityTypes) {
        await dispatch(getEntitiesMetadataAction({ entitiesType, deviceId }))
      }

      for (const entity of response.data.entities) {
        if (entity.action === "deleted") {
          dispatch(
            deleteEntityData({
              entitiesType: entity.entityType,
              entityId: entity.entityId!,
              deviceId,
            })
          )
        } else {
          const entityData = await dispatch(
            getEntityDataAction({
              entitiesType: entity.entityType,
              entityId: entity.entityId!,
              deviceId,
              responseType: "json",
            })
          )

          dispatch(
            setEntityData({
              entitiesType: entity.entityType,
              entityId: entity.entityId!,
              data: entityData.payload as Record<string, unknown>,
              deviceId,
            })
          )
        }
      }
    }

    if (selectActiveApiDeviceId(getState()) === deviceId) {
      dispatch(setLastRefresh(new Date().getTime()))
    }
    dispatch(setLastOutboxData(response.data))

    return {
      deviceId,
      data: response.data,
      timestamp: new Date().getTime(),
    }
  }
)
