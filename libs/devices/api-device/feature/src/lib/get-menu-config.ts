/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { ApiDevice } from "devices/api-device/models"

export const getMenuConfig = async (device: ApiDevice) => {
  return await ApiDeviceSerialPort.request(device, {
    endpoint: "MENU_CONFIGURATION",
    method: "GET",
    body: {
      lang: "en-US",
    },
    options: {
      timeout: 1000,
      retries: 3,
    },
  })
}
