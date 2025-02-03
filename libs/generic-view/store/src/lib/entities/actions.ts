/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { EntityData, EntityId } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"

export const setEntityData = createAction<{
  entitiesType: string
  entityId: EntityId
  data: EntityData
  deviceId: DeviceId
}>(ActionName.SetEntityData)

export const clearEntities = createAction<{ deviceId: DeviceId }>(
  ActionName.ClearEntitiesData
)

export const deleteEntityData = createAction<{
  entitiesType: string
  entityId: EntityId
  deviceId: DeviceId
}>(ActionName.DeleteEntityData)

export const clearAfterDeleteEntities = createAction<{
  entitiesType: string
  deviceId: DeviceId
}>(ActionName.ClearAfterDeleteEntities)

export const setLoadEntitiesAbortController = createAction<{
  deviceId: DeviceId
  entitiesType: string
  abortController: AbortController
}>(ActionName.SetLoadEntitiesAbortController)
