/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { EntitiesConfig, EntitiesMetadata, EntityData } from "device/models"
import {
  clearEntities,
  setEntitiesConfig,
  setEntitiesMetadata,
  setEntityData,
} from "./actions"
import { getEntitiesDataAction } from "./get-entities-data.action"
import { DeviceId } from "Core/device/constants/device-id"

type EntitiesType = string

interface Entities {
  idFieldKey?: string
  config?: EntitiesConfig
  data?: EntityData[]
  metadata?: EntitiesMetadata
  loading?: boolean
  error?: boolean
}

interface EntitiesState {
  [key: DeviceId]: {
    [key: EntitiesType]: Entities | undefined
  }
}

const initialState: EntitiesState = {}

export const genericEntitiesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setEntitiesConfig, (state, action) => {
    const { deviceId, entitiesType } = action.payload

    if (!state[deviceId]) {
      state[deviceId] = {
        [entitiesType]: {
          config: action.payload.config,
          idFieldKey: action.payload.idFieldKey,
        },
      }
    } else if (!state[deviceId][entitiesType]) {
      state[deviceId][entitiesType] = {
        config: action.payload.config,
        idFieldKey: action.payload.idFieldKey,
      }
    }
  })
  builder.addCase(getEntitiesDataAction.pending, (state, action) => {
    const { deviceId, entitiesType } = action.meta.arg

    state[deviceId][entitiesType] = {
      ...state[deviceId][action.meta.arg.entitiesType],
      loading: true,
    }
  })
  builder.addCase(getEntitiesDataAction.fulfilled, (state, action) => {
    const { deviceId, entitiesType } = action.meta.arg

    state[deviceId][entitiesType] = {
      ...state[deviceId][entitiesType],
      data: action.payload,
      loading: false,
    }
  })
  builder.addCase(getEntitiesDataAction.rejected, (state, action) => {
    const { deviceId, entitiesType } = action.meta.arg

    state[deviceId][entitiesType] = {
      ...state[deviceId][entitiesType],
      loading: false,
      error: true,
    }
  })

  builder.addCase(setEntityData, (state, action) => {
    const { deviceId, entitiesType, entityId, data } = action.payload
    const idFieldKey = state[deviceId][entitiesType]?.idFieldKey
    if (!idFieldKey) {
      return
    }
    const entityIndex = state[deviceId][entitiesType]!.data?.findIndex(
      (entity) => entity[idFieldKey] === entityId
    )
    if (entityIndex !== -1 && state[deviceId][entitiesType]?.data) {
      state[deviceId][entitiesType]!.data![entityIndex!] = data
    }
  })
  builder.addCase(setEntitiesMetadata, (state, action) => {
    const { deviceId, entitiesType, metadata } = action.payload
    state[deviceId][entitiesType] = {
      ...state[deviceId][entitiesType],
      metadata,
    }
  })
  builder.addCase(clearEntities, (state, action) => {
    state[action.payload.deviceId] = {}
  })
})
