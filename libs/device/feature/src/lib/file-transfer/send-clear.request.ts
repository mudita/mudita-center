/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ApiFileTransferServiceEvents } from "device/models"
import { ResultObject } from "Core/core/builder"

export const sendClearRequest = (
  transferId: number
): Promise<ResultObject<true>> => {
  return ipcRenderer.callMain(ApiFileTransferServiceEvents.SendClear, {
    transferId,
  })
}
