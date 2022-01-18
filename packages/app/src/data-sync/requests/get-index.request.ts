/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { SerialisedIndexData } from "elasticlunr"
import { IpcDataSyncEvent, DataIndex } from "App/data-sync/constants"

export const getIndexRequest = async <Type extends {}>(
  indexName: DataIndex
): Promise<SerialisedIndexData<Type> | undefined> => {
  return ipcRenderer.callMain(IpcDataSyncEvent.GetIndex, indexName)
}
