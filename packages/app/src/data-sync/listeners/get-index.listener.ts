/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcDataSyncEvent, DataIndex } from "App/data-sync/constants"
import { getIndexService } from "App/data-sync/containers"
import { SerialisedIndexData } from "elasticlunr"

export const registerGetIndexListener = (): void => {
  ipcMain.answerRenderer<DataIndex, SerialisedIndexData<unknown> | undefined>(
    IpcDataSyncEvent.GetIndex,
    async (indexName) => {
      const indexService = getIndexService()
      return indexService?.getIndex(indexName)
    }
  )
}
