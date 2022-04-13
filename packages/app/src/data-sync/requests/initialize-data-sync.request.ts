/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcDataSyncRequest } from "App/data-sync/constants"
import { InitializeOptions } from "App/data-sync/types"

export const initializeDataSyncRequest = async (
  options: InitializeOptions
): Promise<boolean> => {
  return ipcRenderer.callMain(IpcDataSyncRequest.InitializeDataSync, options)
}
