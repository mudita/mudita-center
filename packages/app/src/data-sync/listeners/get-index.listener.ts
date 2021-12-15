/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcDataSyncEvent, DataIndex } from "App/data-sync/constants"
import { getIndexService } from "App/data-sync/containers"

export const registerGetIndexListener = (): void => {
  ipcMain.answerRenderer(
    IpcDataSyncEvent.DataUpdated,
    async (indexName: DataIndex) => {
      const index = getIndexService()
      return index.getIndex(indexName)
    }
  )
}
