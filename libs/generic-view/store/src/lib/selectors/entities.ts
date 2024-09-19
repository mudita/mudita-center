/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

const selectEntitiesOfDevice = createSelector(
  (state: ReduxRootState) => state.genericEntities,
  (state: ReduxRootState, { deviceId }: { deviceId: string }) => deviceId,
  (entities, deviceId) => {
    return entities[deviceId]
  }
)

export const selectEntitiesIdFieldKey = createSelector(
  selectEntitiesOfDevice,
  (state: ReduxRootState, { entitiesType }: { entitiesType?: string }) => {
    return entitiesType
  },
  (entities, entitiesType) => {
    if (!entitiesType) return undefined
    return entities[entitiesType]?.idFieldKey
  }
)

const selectEntities = createSelector(
  selectEntitiesOfDevice,
  (state: ReduxRootState, { entitiesType }: { entitiesType: string }) =>
    entitiesType,
  (entities, entityType) => {
    return entities[entityType]
  }
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
  selectEntitiesOfDevice,
  (entities) => {
    return Object.entries(entities).reduce(
      (
        acc: Record<string, "loading" | "loaded" | "idle" | "error">,
        [entitiesType, entities]
      ) => {
        if (entities?.error) {
          acc[entitiesType] = "error"
        } else if (entities?.loading) {
          acc[entitiesType] = "loading"
        } else if (entities?.data?.length) {
          acc[entitiesType] = "loaded"
        } else {
          acc[entitiesType] = "idle"
        }
        return acc
      },
      {}
    )
  }
)
