/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { APIEntitiesServiceEvents, EntitiesMetadata } from "device/models"

export const getEntitiesMetadataRequest = (data: {
  entitiesType: string
  deviceId?: DeviceId
}): Promise<ResultObject<EntitiesMetadata>> => {
  return ipcRenderer.callMain(APIEntitiesServiceEvents.EntitiesMetadata, data)
}
