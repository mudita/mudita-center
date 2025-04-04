/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { FileManagerServiceEvents } from "device/models"
import { ipcRenderer } from "electron-better-ipc"

export const readBackupDirectoryRequest = ({
  deviceId,
  disableErrorLog,
}: {
  deviceId?: DeviceId
  disableErrorLog?: boolean
}): Promise<ResultObject<string[]>> => {
  return ipcRenderer.callMain(FileManagerServiceEvents.ReadBackupDirectory, {
    deviceId,
    disableErrorLog,
  })
}
