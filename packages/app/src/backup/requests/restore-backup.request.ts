/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { BackupError, IpcBackupEvent } from "App/backup/constants"
import { RestoreDeviceBackup } from "App/backup/types"

export const restoreBackupRequest = async (
  options: RestoreDeviceBackup
): Promise<ResultObject<boolean, BackupError>> => {
  return ipcRenderer.callMain(IpcBackupEvent.RestoreBackup, options)
}
