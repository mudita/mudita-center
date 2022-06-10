/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcBackupDevice } from "App/backup/constants/ipc-backup.enum"
import { DownloadDeviceFileLocallyOptions } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleDownloadDeviceBackup = (
  { deviceBackup }: Adapters,
  options: DownloadDeviceFileLocallyOptions
): Promise<RequestResponse<string[]>> => {
  return deviceBackup.downloadDeviceBackup(options)
}

export const registerDownloadDeviceBackupRequest = createEndpoint({
  name: IpcBackupDevice.DownloadDeviceBackup,
  handler: handleDownloadDeviceBackup,
})
