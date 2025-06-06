/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const selectDeviceEntities = createSelector(
  (state: ReduxRootState) => state.genericEntities,
  (_: ReduxRootState, { deviceId }: { deviceId: string }) => deviceId,
  (deviceEntitiesMap, deviceId) => {
    return deviceEntitiesMap[deviceId]
  }
)

export const selectEntitiesIdFieldKey = createSelector(
  selectDeviceEntities,
  (_: ReduxRootState, { entitiesType }: { entitiesType?: string }) => {
    return entitiesType
  },
  (entities, entitiesType) => {
    if (!entitiesType || !entities) {
      return undefined
    }
    return entities[entitiesType]?.idFieldKey
  }
)

export const selectEntities = createSelector(
  selectDeviceEntities,
  (_: ReduxRootState, { entitiesType }: { entitiesType: string }) =>
    entitiesType,
  (entities, entityType) => {
    if (!entities) {
      return undefined
    }
    return entities[entityType]
  }
)

export const selectEntitiesMetadata = createSelector(
  selectEntities,
  (entities) => entities?.metadata
)

export const selectEntitiesData = createSelector(
  selectEntities,
  (entities) => entities?.data
)

export const selectFailedEntities = createSelector(
  selectEntities,
  (entities) => {
    return entities?.failedEntities ? entities.failedEntities : []
  }
)

export const selectSuccessDeletedEntitiesIds = createSelector(
  selectEntities,
  (entities) => (entities?.successIds ? entities?.successIds : [])
)

export const selectEntityData = createSelector(
  selectEntities,
  (state: ReduxRootState, { entityId }: { entityId: string }) => entityId,
  (entities, entityId) => {
    if (!entities || !entities.data || !entities.idFieldKey) {
      return undefined
    }
    return entities.data.find(
      (entity) => entity[entities.idFieldKey!] === entityId
    )
  }
)

export const selectEntitiesLoadingState = createSelector(
  selectDeviceEntities,
  (entities = {}) => {
    return Object.entries(entities).reduce(
      (
        acc: Record<
          string,
          | { state: "error" }
          | {
              state: "loading" | "loaded" | "idle"
              progress: number
            }
        >,
        [entitiesType, entity]
      ) => {
        if (entity?.error) {
          acc[entitiesType] = {
            state: "error",
          }
        } else if (entity?.metadata?.totalEntities === 0 || entity?.data) {
          acc[entitiesType] = {
            state: "loaded",
            progress: 100,
          }
        } else if (entity?.loading) {
          acc[entitiesType] = {
            state: "loading",
            progress: entity.progress || 0,
          }
        } else {
          acc[entitiesType] = {
            state: "idle",
            progress: 0,
          }
        }
        return acc
      },
      {}
    )
  }
)

export const selectValidEntityFilePaths = createSelector(
  selectEntitiesData,
  (entitiesData) => {
    return entitiesData?.map((entityData) => {
      if (typeof entityData.filePath === "string") {
        return entityData.filePath
      }
      throw new Error("Invalid entity: filePath is missing or not a string")
    })
  }
)

export const selectDeviceEntityAbortController = createSelector(
  selectDeviceEntities,
  (
    _: ReduxRootState,
    { entitiesType }: { deviceId: string; entitiesType?: string }
  ) => {
    return entitiesType
  },
  (entities, entitiesType) => {
    if (!entitiesType || !entities) {
      return undefined
    }
    return entities[entitiesType]?.abortController
  }
)

export const selectIsSomeLoadEntitiesCanceled = createSelector(
  selectDeviceEntities,
  (
    _: ReduxRootState,
    { entityTypes }: { deviceId: string; entityTypes: string[] }
  ) => entityTypes,
  (entities, entityTypes) => {
    if (entities === undefined) {
      return false
    }

    return entityTypes.some(
      (entityType) =>
        entities[entityType]?.error ||
        (entities[entityType]?.loading === false &&
          entities[entityType]?.data === undefined)
    )
  }
)
