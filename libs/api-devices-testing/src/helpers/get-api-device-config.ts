/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import { getSerialPortService } from "./get-serial-port-service"

export const getApiDeviceConfig = async (device: ApiDevice) => {
  const serialPortService = await getSerialPortService()
  return serialPortService.request(device.id, {
    endpoint: "API_CONFIGURATION",
    method: "GET",
    options: {
      timeout: 5000,
    },
  })
}
