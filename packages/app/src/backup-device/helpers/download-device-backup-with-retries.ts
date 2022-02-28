/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"
import downloadDeviceBackupRequest from "App/backup-device/requests/download-device-backup.request"
import { isResponsesSuccessWithData } from "Renderer/utils/is-responses-success-with-data.helpers"
import { DownloadDeviceFileLocallyOptions } from "Backend/adapters/device-file-system/device-file-system-adapter.class"

export const downloadDeviceBackupWithRetries = async (
  options: DownloadDeviceFileLocallyOptions,
  time = 0
): Promise<DeviceResponse<string[]>> => {
  const response = await downloadDeviceBackupRequest(options)
  if (isResponsesSuccessWithData([response])) {
    return response
  } else if (time === 3) {
    return response
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(downloadDeviceBackupWithRetries(options, ++time))
      }, 2500)
    })
  }
}
