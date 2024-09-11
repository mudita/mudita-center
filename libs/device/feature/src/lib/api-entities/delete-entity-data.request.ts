/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { APIEntitiesServiceEvents, EntityId } from "device/models"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"

export const deleteEntityDataRequest = (data: {
  entitiesType: string
  entityId: EntityId
  deviceId?: DeviceId
}): Promise<ResultObject<undefined>> => {
  return ipcRenderer.callMain(APIEntitiesServiceEvents.EntityDataDelete, data)
}
