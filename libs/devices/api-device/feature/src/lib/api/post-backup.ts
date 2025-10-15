/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { ApiDevice, PostBackupRequest } from "devices/api-device/models"

export const postBackup = async (
  device: ApiDevice,
  { backupId }: PostBackupRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "POST_BACKUP",
    method: "POST",
    body: {
      backupId,
    },
    options: {
      timeout: 10_000,
      retries: 2,
    },
  })
}
