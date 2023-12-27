/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcIndexStorageEvent } from "Core/index-storage/constants/controller.constant"
import { InitializeOptions } from "Core/data-sync/types"

export const loadIndexRequest = (
  options: InitializeOptions
): Promise<boolean> => {
  return ipcRenderer.callMain(IpcIndexStorageEvent.LoadIndex, options)
}
