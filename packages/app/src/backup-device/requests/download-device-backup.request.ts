/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { IpcBackupDevice } from "App/backup/constants/ipc-backup.enum"
import { DownloadDeviceFileLocallyOptions } from "Backend/adapters/device-file-system/device-file-system-adapter.class"

const downloadDeviceBackupRequest = async (
  options: DownloadDeviceFileLocallyOptions
): Promise<DeviceResponse<string[]>> => {
  return await ipcRenderer.callMain(
    IpcBackupDevice.DownloadDeviceBackup,
    options
  )
}

export default downloadDeviceBackupRequest
