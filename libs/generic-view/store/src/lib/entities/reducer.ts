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
import { createEntityDataAction } from "./create-entity-data.action"

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
    const entityId = action.meta.arg.entityId
    const entitiesType = action.meta.arg.entitiesType

    const entities = state.entities[entitiesType]

    if (entities && entities.data && entities.idFieldKey) {
      entities.data = entities.data.filter(
        (entity) => entity[entities.idFieldKey!] !== entityId
      )
    }
  })
  builder.addCase(createEntityDataAction.fulfilled, (state, action) => {
    const entitiesType = action.meta.arg.entitiesType
    const newEntity = action.payload

    const entities = state.entities[entitiesType]

    const idFieldKey = entities?.idFieldKey

    if (idFieldKey) {
      if (!entities.data) {
        entities.data = []
      }

      const entityExists = entities.data.some(
        (entity) => entity[idFieldKey] === newEntity[idFieldKey]
      )

      if (!entityExists) {
        entities.data.push(newEntity)
      } else {
        // TODO: for debug to delete
        console.warn(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `Entity with ID ${newEntity[idFieldKey]} already exists in ${entitiesType}`
        )
      }
    }
  })
})
