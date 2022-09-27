/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcBackupRequest } from "App/backup/constants"
import { CreateDeviceBackup } from "App/backup/types"

export const createBackupRequest = async (
  options: CreateDeviceBackup
): Promise<ResultObject<string[]>> => {
  return ipcRenderer.callMain(IpcBackupRequest.CreateBackup, options)
}
