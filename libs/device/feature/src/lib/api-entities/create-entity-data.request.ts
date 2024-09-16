/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { APIEntitiesServiceEvents, EntityData } from "device/models"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"

export const createEntityDataRequest = (data: {
  entitiesType: string
  data: EntityData
  deviceId?: DeviceId
}): Promise<ResultObject<EntityData>> => {
  return ipcRenderer.callMain(APIEntitiesServiceEvents.EntityDataCreate, data)
}
