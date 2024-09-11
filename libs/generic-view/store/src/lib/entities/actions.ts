/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { EntityData, EntitiesMetadata, EntitiesConfig } from "device/models"
import { EntityId } from "device/feature"

export const setEntitiesConfig = createAction<{
  entitiesType: string
  config: EntitiesConfig
  idFieldKey: string
}>(ActionName.SetEntitiesConfig)

export const setEntitiesMetadata = createAction<{
  entitiesType: string
  metadata: EntitiesMetadata
}>(ActionName.SetEntitiesMetadata)

export const setEntitiesData = createAction<{
  entitiesType: string
  data: EntityData[]
}>(ActionName.SetEntitiesData)

export const setEntityData = createAction<{
  entitiesType: string
  entityId: EntityId
  data: EntityData
}>(ActionName.SetEntityData)
