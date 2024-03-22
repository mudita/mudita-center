/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { DeviceSystemActionsServiceEvents } from "device/models"
import { ResultObject } from "Core/core/builder"

export const lockDeviceRequest = async (
  deviceId?: string
): Promise<ResultObject<undefined>> => {
  return ipcRenderer.callMain(DeviceSystemActionsServiceEvents.Lock, {
    deviceId,
  })
}
