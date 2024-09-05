/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { APIEntitiesServiceEvents, EntitiesConfig } from "device/models"

export const getEntitiesConfigRequest = (data: {
  entityType: string
  deviceId?: DeviceId
}): Promise<ResultObject<EntitiesConfig>> => {
  return ipcRenderer.callMain(APIEntitiesServiceEvents.EntitiesConfig, data)
}
