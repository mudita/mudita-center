/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { EntitiesConfig, EntitiesMetadata, EntityData } from "device/models"
import {
  setEntitiesConfig,
  setEntitiesData,
  setEntitiesMetadata,
  setEntityData,
} from "./actions"

type EntityType = string

interface Entities {
  idFieldKey?: string
  config?: EntitiesConfig
  data?: EntityData[]
  metadata?: EntitiesMetadata
}

interface EntitiesState {
  entities: {
    [key: EntityType]: Entities | undefined
  }
}

const initialState: EntitiesState = {
  entities: {},
}

export const genericEntitiesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setEntitiesConfig, (state, action) => {
    state.entities[action.payload.entityType] = {
      ...state.entities[action.payload.entityType],
      config: action.payload.config,
      idFieldKey: action.payload.idFieldKey,
    }
  })
  builder.addCase(setEntitiesData, (state, action) => {
    state.entities[action.payload.entityType] = {
      ...state.entities[action.payload.entityType],
      data: action.payload.data,
    }
  })
  builder.addCase(setEntityData, (state, action) => {
    state.entities[action.payload.entityType]?.data?.map((entity) => {
      if (
        entity[state.entities.idFieldKey as keyof typeof entity] ===
        action.payload.entityId
      ) {
        return action.payload.data
      }
      return entity
    })
  })
  builder.addCase(setEntitiesMetadata, (state, action) => {
    state.entities[action.payload.entityType] = {
      ...state.entities[action.payload.entityType],
      metadata: {
        ...state.entities[action.payload.entityType]?.metadata,
        ...action.payload.metadata,
      },
    }
  })
})
