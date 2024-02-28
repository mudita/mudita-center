/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { FileManagerServiceEvents } from "device/models"
import { ipcRenderer } from "electron-better-ipc"

export const saveBackupFileRequest = (
  featureToTransferId: Record<string, number>,
  deviceId?: DeviceId,
  password?: string
): Promise<ResultObject<undefined>> => {
  return ipcRenderer.callMain(FileManagerServiceEvents.SaveBackupFile, {
    featureToTransferId,
    deviceId,
    password,
  })
}
