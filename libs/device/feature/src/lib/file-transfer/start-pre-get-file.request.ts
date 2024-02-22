/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ApiFileTransferServiceEvents, PreTransferGet } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { ResultObject } from "Core/core/builder"

export const startPreGetFileRequest = (
  filePath: string,
  deviceId?: DeviceId
): Promise<ResultObject<PreTransferGet>> => {
  return ipcRenderer.callMain(ApiFileTransferServiceEvents.PreGet, {
    filePath,
    deviceId,
  })
}
