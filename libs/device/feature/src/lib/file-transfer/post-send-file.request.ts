/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ApiFileTransferServiceEvents, PostTransferSend } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { ResultObject } from "Core/core/builder"

export const postSendFileRequest = (
  transferId: number,
  deviceId?: DeviceId
): Promise<ResultObject<PostTransferSend & { finished: boolean }>> => {
  return ipcRenderer.callMain(ApiFileTransferServiceEvents.PostSend, {
    transferId,
    deviceId,
  })
}
