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
import { getEntitiesDataAction } from "./get-entities-data.action"

type EntitiesType = string

interface Entities {
  idFieldKey?: string
  config?: EntitiesConfig
  data?: EntityData[]
  metadata?: EntitiesMetadata & {
    _loading?: boolean
  }
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
  builder.addCase(getEntitiesDataAction.pending, (state, action) => {
    state.entities[action.meta.arg.entitiesType] = {
      ...state.entities[action.meta.arg.entitiesType],
      metadata: {
        ...(state.entities[action.meta.arg.entitiesType]
          ?.metadata as EntitiesMetadata),
        _loading: true,
      },
    }
  })
  builder.addCase(getEntitiesDataAction.fulfilled, (state, action) => {
    state.entities[action.meta.arg.entitiesType] = {
      ...state.entities[action.meta.arg.entitiesType],
      data: action.payload,
      metadata: {
        ...(state.entities[action.meta.arg.entitiesType]
          ?.metadata as EntitiesMetadata),
        _loading: false,
      },
    }
  })
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
})
