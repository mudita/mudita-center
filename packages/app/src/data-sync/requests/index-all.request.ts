/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcDataSyncRequest } from "App/data-sync/constants"

export const indexAllRequest = async (): Promise<boolean> => {
  return ipcRenderer.callMain(IpcDataSyncRequest.IndexAll)
}
