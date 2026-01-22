/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, AppInstallGetRequest } from "devices/api-device/models"
import { getSerialPortService } from "./get-serial-port-service"

export const getAppInstall = async (
  device: ApiDevice,
  { installationId }: AppInstallGetRequest
) => {
  const serialPortService = await getSerialPortService()
  return serialPortService.request(device.id, {
    endpoint: "APP_INSTALL",
    method: "GET",
    body: {
      installationId,
    },
  })
}
