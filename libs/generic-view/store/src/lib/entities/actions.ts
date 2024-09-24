/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import {
  EntityData,
  EntitiesMetadata,
  EntitiesConfig,
  EntityId,
} from "device/models"
import { DeviceId } from "Core/device/constants/device-id"

export const setEntitiesConfig = createAction<{
  entitiesType: string
  config: EntitiesConfig
  idFieldKey: string
  deviceId: DeviceId
}>(ActionName.SetEntitiesConfig)

export const setEntitiesMetadata = createAction<{
  entitiesType: string
  metadata: EntitiesMetadata
  deviceId: DeviceId
}>(ActionName.SetEntitiesMetadata)

export const setEntityData = createAction<{
  entitiesType: string
  entityId: EntityId
  data: EntityData
  deviceId: DeviceId
}>(ActionName.SetEntityData)

export const clearEntities = createAction<{ deviceId: DeviceId }>(
  ActionName.ClearEntitiesData
)
