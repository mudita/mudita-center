/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

const selectDeviceEntities = createSelector(
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

const selectEntities = createSelector(
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
