/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcBackupEvent } from "Core/backup/constants"
import { CreateDeviceBackup } from "Core/backup/types"

export const createBackupRequest = async (
  options: CreateDeviceBackup
): Promise<ResultObject<string[]>> => {
  return ipcRenderer.callMain(IpcBackupEvent.CreateBackup, options)
}
