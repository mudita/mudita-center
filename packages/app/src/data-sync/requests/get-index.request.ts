/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { SerialisedIndexData } from "elasticlunr"
import { IpcDataSyncRequest, DataIndex } from "App/data-sync/constants"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/ban-types
export const getIndexRequest = async <Type extends {}>(
  indexName: DataIndex
): Promise<SerialisedIndexData<Type> | undefined> => {
  return ipcRenderer.callMain(IpcDataSyncRequest.GetIndex, indexName)
}
