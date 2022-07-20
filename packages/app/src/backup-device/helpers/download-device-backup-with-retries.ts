/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import downloadDeviceBackupRequest from "App/backup-device/requests/download-device-backup.request"
import { isResponsesSuccessWithData } from "App/core/helpers"
import { DownloadDeviceFileLocallyOptions } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import { RequestResponse } from "App/core/types/request-response.interface"

export const downloadDeviceBackupWithRetries = async (
  options: DownloadDeviceFileLocallyOptions,
  time = 0
): Promise<RequestResponse<string[]>> => {
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
