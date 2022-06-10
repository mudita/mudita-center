/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcBackupDevice } from "App/backup/constants/ipc-backup.enum"
import { DownloadDeviceFileLocallyOptions } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import { RequestResponse } from "App/core/types/request-response.interface"

const downloadDeviceBackupRequest = async (
  options: DownloadDeviceFileLocallyOptions
): Promise<RequestResponse<string[]>> => {
  return await ipcRenderer.callMain(
    IpcBackupDevice.DownloadDeviceBackup,
    options
  )
}

export default downloadDeviceBackupRequest
