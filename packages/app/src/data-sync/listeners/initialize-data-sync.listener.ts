/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcDataSyncEvent } from "App/data-sync/constants"
import { getIndexService } from "App/data-sync/containers"
import { InitializeOptions } from "App/data-sync/types"

export const registerInitializeDataSyncListener = (): void => {
  ipcMain.answerRenderer<InitializeOptions, boolean>(
    IpcDataSyncEvent.InitializeDataSync,
    async (options: InitializeOptions) => {
      const indexService = getIndexService()
      return indexService?.initialize(options) ?? false
    }
  )
}
