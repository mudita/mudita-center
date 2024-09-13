/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const selectEntitiesIdFieldKey = createSelector(
  (state: ReduxRootState) => state.genericEntities.entities,
  (state: ReduxRootState, { entitiesType }: { entitiesType?: string }) => {
    return entitiesType
  },
  (entities, entitiesType) => {
    if (!entitiesType) {
      return undefined
    }
    return entities[entitiesType]?.idFieldKey
  }
)

const selectEntities = createSelector(
  (state: ReduxRootState) => state.genericEntities.entities,
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
  (state: ReduxRootState) => state.genericEntities.entities,
  (entities) => {
    return Object.entries(entities).reduce(
      (
        acc: Record<string, "loading" | "loaded" | "idle">,
        [entitiesType, entities]
      ) => {
        if (entities?.metadata?._loading) {
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
