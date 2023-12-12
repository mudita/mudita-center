/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcBackupEvent } from "Core/backup/constants"
import { Backup } from "Core/backup/dto"

export const loadBackupsRequest = async (
  options: string
): Promise<ResultObject<Backup[]>> => {
  return ipcRenderer.callMain(IpcBackupEvent.LoadBackups, options)
}
