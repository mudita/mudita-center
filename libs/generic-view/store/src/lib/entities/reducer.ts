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
import { deleteEntityDataAction } from "./delete-entity-data.action"

type EntitiesType = string

interface Entities {
  idFieldKey?: string
  config?: EntitiesConfig
  data?: EntityData[]
  metadata?: EntitiesMetadata
}

interface EntitiesState {
  entities: {
    [key: EntitiesType]: Entities | undefined
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
    const entitiesType = action.payload.entitiesType
    const idFieldKey = state.entities[entitiesType]!.idFieldKey!
    const entityIndex = state.entities[entitiesType]!.data?.findIndex(
      (entity) => entity[idFieldKey] === action.payload.entityId
    )
    if (entityIndex !== -1 && state.entities[entitiesType]?.data) {
      state.entities[entitiesType]!.data![entityIndex!] = action.payload.data
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
  builder.addCase(deleteEntityDataAction.fulfilled, (state, action) => {
    const entitiesIds = action.payload
    const entitiesType = action.meta.arg.entitiesType

    const entities = state.entities[entitiesType]

    if (entities && entities.data && entities.idFieldKey) {
      entities.data = entities.data.filter(
        (entity) =>
          !entitiesIds.includes(entity[entities.idFieldKey!] as string)
      )
    }
  })
})
