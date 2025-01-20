/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ApiFileTransferServiceEvents } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { ResultObject } from "Core/core/builder"

export const startPreSendFileRequest = (
  targetPath: string,
  source:
    | {
        path: string
      }
    | {
        base64: string
      },
  deviceId?: DeviceId
): Promise<
  ResultObject<{
    transferId: number
    chunksCount: number
  }>
> => {
  return ipcRenderer.callMain(ApiFileTransferServiceEvents.PreSend, {
    targetPath,
    source,
    deviceId,
  })
}
