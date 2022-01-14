/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcDataSyncEvent } from "App/data-sync/constants"
import { getIndexService } from "App/data-sync/containers"

export const registerIndexAllListener = (): void => {
  ipcMain.answerRenderer<void, void>(
    IpcDataSyncEvent.IndexAll,
    async () => {
      const index = getIndexService()
      return index?.indexAll()
    }
  )
}
