/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  APIEntitiesServiceEvents,
  EntitiesDeleteResponse,
  EntityId,
} from "device/models"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"

export const deleteEntitiesDataRequest = (data: {
  entitiesType: string
  ids: EntityId[]
  deviceId?: DeviceId
}): Promise<ResultObject<EntitiesDeleteResponse>> => {
  console.log("Ajdiczki: ", data)
  return ipcRenderer.callMain(APIEntitiesServiceEvents.EntitiesDataDelete, data)
}
