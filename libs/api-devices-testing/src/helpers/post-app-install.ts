/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, AppInstallPostRequest } from "devices/api-device/models"
import { getSerialPortService } from "./get-serial-port-service"

export const postAppInstall = async (
  device: ApiDevice,
  { filePath }: AppInstallPostRequest
) => {
  const serialPortService = await getSerialPortService()
  return serialPortService.request(device.id, {
    endpoint: "APP_INSTALL",
    method: "POST",
    body: {
      filePath,
    },
  })
}
