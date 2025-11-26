/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, AppInstallPostRequest } from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const postAppInstall = (
  device: ApiDevice,
  { filePath }: AppInstallPostRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "APP_INSTALL",
    method: "POST",
    body: {
      filePath,
    },
  })
}
