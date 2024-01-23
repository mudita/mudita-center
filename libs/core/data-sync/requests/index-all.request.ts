/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcDataSyncEvent } from "Core/data-sync/constants"
import { InitializeOptions } from "Core/data-sync/types"

export const indexAllRequest = async (
  options: InitializeOptions
): Promise<boolean> => {
  return ipcRenderer.callMain(IpcDataSyncEvent.IndexAll, options)
}
