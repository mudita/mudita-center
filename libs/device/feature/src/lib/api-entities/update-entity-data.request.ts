/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  APIEntitiesServiceEvents,
  EntityData,
  EntityDataPatch,
  EntityId,
} from "device/models"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"

export const updateEntityDataRequest = (data: {
  entitiesType: string
  entityId: EntityId
  data: EntityData
  deviceId?: DeviceId
}): Promise<ResultObject<EntityDataPatch>> => {
  return ipcRenderer.callMain(APIEntitiesServiceEvents.EntityDataUpdate, data)
}
