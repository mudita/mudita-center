/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { IpcBackupDevice } from "App/backup/constants/ipc-backup.enum"
import { DeviceFile } from "Backend/adapters/device-file-system/device-file-system-adapter.class"

const handleDownloadDeviceBackup = ({
  backupDevice,
}: Adapters): Promise<DeviceResponse<DeviceFile>> => {
  return backupDevice.downloadDeviceBackup()
}

export const registerDownloadDeviceBackupRequest = createEndpoint({
  name: IpcBackupDevice.DownloadDeviceBackup,
  handler: handleDownloadDeviceBackup,
})
