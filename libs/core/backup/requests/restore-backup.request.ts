/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { BackupError, IpcBackupEvent } from "Core/backup/constants"
import { RestoreDeviceBackup } from "Core/backup/types"

export const restoreBackupRequest = async (
  options: RestoreDeviceBackup
): Promise<ResultObject<boolean, BackupError>> => {
  return ipcRenderer.callMain(IpcBackupEvent.RestoreBackup, options)
}
