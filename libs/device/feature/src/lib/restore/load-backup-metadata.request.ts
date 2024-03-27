/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { APIRestoreServiceEvents, RestoreMetadata } from "device/models"

export const loadBackupMetadataRequest = (
  fileId: string
): Promise<ResultObject<RestoreMetadata>> => {
  return ipcRenderer.callMain(APIRestoreServiceEvents.LoadBackupMetadata, {
    id: fileId,
  })
}
