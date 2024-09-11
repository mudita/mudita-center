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
    state.entities[action.payload.entitiesType] = {
      ...state.entities[action.payload.entitiesType],
      config: action.payload.config,
      idFieldKey: action.payload.idFieldKey,
    }
  })
  builder.addCase(setEntitiesData, (state, action) => {
    state.entities[action.payload.entitiesType] = {
      ...state.entities[action.payload.entitiesType],
      data: action.payload.data,
    }
  })
  builder.addCase(setEntityData, (state, action) => {
    const entityType = action.payload.entityType
    const idFieldKey = state.entities[entityType]!.idFieldKey!
    const entityIndex = state.entities[entityType]!.data?.findIndex(
      (entity) => entity[idFieldKey] === action.payload.entityId
    )
    if (entityIndex !== -1 && state.entities[entityType]?.data) {
      state.entities[entityType]!.data![entityIndex!] = action.payload.data
    }
  })
  builder.addCase(setEntitiesMetadata, (state, action) => {
    state.entities[action.payload.entitiesType] = {
      ...state.entities[action.payload.entitiesType],
      metadata: {
        ...state.entities[action.payload.entitiesType]?.metadata,
        ...action.payload.metadata,
      },
    }
  })
})
