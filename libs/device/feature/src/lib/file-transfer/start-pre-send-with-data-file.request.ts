/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ApiFileTransferServiceEvents } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { ResultObject } from "Core/core/builder"

export const startPreSendWithDataFileRequest = (
  dataId: string,
  targetPath: string,
  data: string,
  deviceId?: DeviceId
): Promise<
  ResultObject<{
    transferId: number
    chunksCount: number
  }>
> => {
  return ipcRenderer.callMain(ApiFileTransferServiceEvents.PreSendWithData, {
    dataId,
    targetPath,
    deviceId,
    data,
  })
}
