/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ApiFileTransferServiceEvents } from "device/models"

export const sendClearRequest = (transferId: number): Promise<void> => {
  return ipcRenderer.callMain(ApiFileTransferServiceEvents.Clear, {
    transferId,
  })
}
