/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { EntitiesConfig, EntitiesMetadata, EntityData } from "device/models"
import {
  clearAfterDeleteEntities,
  clearEntities,
  deleteEntityData,
  setEntityData,
  setLoadEntitiesAbortController,
} from "./actions"
import { getEntitiesDataAction } from "./get-entities-data.action"
import { DeviceId } from "Core/device/constants/device-id"
import { deleteEntitiesDataAction } from "./delete-entities-data.action"
import { createEntityDataAction } from "./create-entity-data.action"
import { updateEntityDataAction } from "./update-entity-data.action"
import { getEntitiesConfigAction } from "./get-entities-config.action"
import { getEntitiesMetadataAction } from "./get-entities-metadata.action"

type EntitiesType = string

interface Entities {
  idFieldKey?: string
  config?: EntitiesConfig
  data?: EntityData[]
  metadata?: EntitiesMetadata
  loading?: boolean
  progress?: number
  error?: boolean
  failedIds?: string[]
  successIds?: string[]
  abortController?: AbortController
}

export type DeviceEntitiesMap = Record<EntitiesType, Entities | undefined>

export interface EntitiesState {
  [key: DeviceId]: DeviceEntitiesMap | undefined
}

const initialState: EntitiesState = {}

export const genericEntitiesReducer = createReducer(initialState, (builder) => {
  builder.addCase(getEntitiesConfigAction.fulfilled, (state, action) => {
    const { deviceId, entitiesType } = action.meta.arg

    state[deviceId] = {
      ...state[deviceId],
      [entitiesType]: {
        config: action.payload.config,
        idFieldKey: action.payload.idFieldKey,
        abortController: state[deviceId]?.[entitiesType]?.abortController,
      },
    }
  })
  builder.addCase(getEntitiesDataAction.pending, (state, action) => {
    const { deviceId, entitiesType } = action.meta.arg
    if (!state[deviceId]?.[entitiesType]) {
      return
    }

    state[deviceId]![entitiesType]!.loading = true
    state[deviceId]![entitiesType]!.error = false
  })
  builder.addCase(getEntitiesDataAction.fulfilled, (state, action) => {
    const { deviceId, entitiesType } = action.meta.arg
    if (!state[deviceId]?.[entitiesType]) {
      return
    }

    state[deviceId]![entitiesType]!.data = action.payload
    state[deviceId]![entitiesType]!.loading = false
    state[deviceId]![entitiesType]!.progress = 0
    state[deviceId]![entitiesType]!.abortController = new AbortController()
  })
  builder.addCase(getEntitiesDataAction.rejected, (state, action) => {
    const { deviceId, entitiesType } = action.meta.arg
    if (!state[deviceId]?.[entitiesType]) {
      return
    }

    state[deviceId]![entitiesType]!.loading = false
    state[deviceId]![entitiesType]!.progress = 0
    state[deviceId]![entitiesType]!.error = true
    state[deviceId]![entitiesType]!.abortController = new AbortController()
  })

  builder.addCase(setEntityData, (state, action) => {
    const { deviceId, entitiesType, entityId, data } = action.payload
    const idFieldKey = state[deviceId]?.[entitiesType]?.idFieldKey

    if (!idFieldKey) {
      return
    }

    const entityIndex = state[deviceId]![entitiesType]!.data?.findIndex(
      (entity) => entity[idFieldKey] === entityId
    )

    if (state[deviceId]![entitiesType]?.data) {
      if (entityIndex !== -1) {
        state[deviceId]![entitiesType]!.data![entityIndex!] = data
      } else {
        state[deviceId]![entitiesType]!.data!.push(data)
      }
    }
  })
  builder.addCase(getEntitiesMetadataAction.fulfilled, (state, action) => {
    const { deviceId, entitiesType } = action.meta.arg
    if (!state[deviceId]?.[entitiesType]) {
      return
    }

    state[deviceId]![entitiesType]!.metadata = action.payload
  })
  builder.addCase(clearEntities, (state, action) => {
    state[action.payload.deviceId] = {}
  })
  builder.addCase(deleteEntitiesDataAction.fulfilled, (state, action) => {
    const { entitiesType, deviceId } = action.meta.arg
    if (!state[deviceId]?.[entitiesType]) {
      return
    }

    const entitiesIds = action.payload
    const entities = state[deviceId]![entitiesType]

    if (entities && entities.data && entities.idFieldKey) {
      entities.data = entities.data.filter(
        (entity) =>
          !entitiesIds.includes(entity[entities.idFieldKey!] as string)
      )
    }
  })
  builder.addCase(deleteEntitiesDataAction.rejected, (state, action) => {
    const { entitiesType, deviceId } = action.meta.arg
    const { failedIds = [], successIds = [] } = action.payload || {}
    if (!state[deviceId]?.[entitiesType]) {
      return
    }

    const entities = state[deviceId]![entitiesType]

    if (entities) {
      entities.failedIds = failedIds
      entities.successIds = successIds
    }
  })
  builder.addCase(clearAfterDeleteEntities, (state, action) => {
    const { entitiesType, deviceId } = action.payload

    const entities = state[deviceId]![entitiesType]

    if (entities) {
      entities.failedIds = []
      entities.successIds = []
    }
  })
  builder.addCase(deleteEntityData, (state, action) => {
    const { entitiesType, deviceId, entityId } = action.payload
    if (!state[deviceId]?.[entitiesType]) {
      return
    }

    const entities = state[deviceId]![entitiesType]

    if (entities && entities.data && entities.idFieldKey) {
      entities.data = entities.data.filter(
        (entity) => entity[entities.idFieldKey!] !== entityId
      )
    }
  })
  builder.addCase(createEntityDataAction.fulfilled, (state, action) => {
    const { entitiesType, deviceId } = action.meta.arg

    if (!state[deviceId]?.[entitiesType]) {
      return
    }

    const newEntity = action.payload
    const entities = state[deviceId]![entitiesType]

    if (!entities) return
    if (!entities.data) {
      entities.data = [newEntity]
    } else {
      entities.data.push(newEntity)
    }
  })
  builder.addCase(updateEntityDataAction.fulfilled, (state, action) => {
    const { entitiesType, deviceId } = action.meta.arg
    if (!state[deviceId]?.[entitiesType]) {
      return
    }

    const updatedEntity = action.payload
    const entities = state[deviceId]![entitiesType]
    const idFieldKey = entities?.idFieldKey

    if (!entities || !entities.data || !idFieldKey) return
    const entityIndex = entities.data.findIndex(
      (entity) => entity[idFieldKey] === updatedEntity[idFieldKey!]
    )
    if (entityIndex === -1) return
    entities.data[entityIndex] = updatedEntity
  })
  builder.addCase(setLoadEntitiesAbortController, (state, action) => {
    const { deviceId, entitiesType, abortController } = action.payload

    state[deviceId] = {
      ...state[deviceId],
      [entitiesType]: {
        ...state[deviceId]?.[entitiesType],
        abortController,
      },
    }
  })
  // builder.addCase(setEntitiesProgress, (state, action) => {
  //   const { deviceId, entitiesType, progress } = action.payload
  //   if (!state[deviceId]?.[entitiesType]) {
  //     return
  //   }
  //   state[deviceId]![entitiesType]!.progress = progress
  // })
})
