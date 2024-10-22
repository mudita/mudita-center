/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { DataIndex, IpcDataSyncEvent } from "Core/data-sync/constants"
import { GetIndex } from "Core/data-sync/types"

export const getIndexRequest = async <Name extends DataIndex>(
  indexName: Name
): Promise<GetIndex<Name>> => {
  return ipcRenderer.callMain(IpcDataSyncEvent.GetIndex, indexName)
}
