/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"
import { DeviceFile } from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import downloadDeviceBackupRequest from "App/backup-device/requests/download-device-backup.request"
import { isResponsesSuccessWithData } from "Renderer/utils/is-responses-success-with-data.helpers"

export const downloadDeviceBackupWithRetries = async(time = 0): Promise<DeviceResponse<DeviceFile>> => {
  const response = await downloadDeviceBackupRequest()
  if(isResponsesSuccessWithData([response]) ){
    return response
  } else if(time === 3){
    return response
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(downloadDeviceBackupWithRetries(++time))
      }, 2500)
    })
  }
}

