/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { APIBackupServiceEvents } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"

export const postBackupRequest = (
  backupId: number,
  deviceId?: DeviceId
): Promise<ResultObject<undefined>> => {
  return ipcRenderer.callMain(APIBackupServiceEvents.PostBackup, {
    backupId,
    deviceId,
  })
}
