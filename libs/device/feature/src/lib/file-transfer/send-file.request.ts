/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ApiFileTransferServiceEvents, TransferSend } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { ResultObject } from "Core/core/builder"

export const sendFileRequest = (
  transferId: number,
  chunkNumber: number,
  deviceId?: DeviceId
): Promise<ResultObject<TransferSend>> => {
  return ipcRenderer.callMain(ApiFileTransferServiceEvents.Send, {
    transferId,
    chunkNumber,
    deviceId,
  })
}
