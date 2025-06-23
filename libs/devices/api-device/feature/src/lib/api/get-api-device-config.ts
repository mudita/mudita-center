/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort, OKResponse } from "devices/api-device/adapters"
import { ApiDevice } from "devices/api-device/models"

export const getApiDeviceConfig = async (device: ApiDevice) => {
  return await ApiDeviceSerialPort.request(device, {
    endpoint: "API_CONFIGURATION",
    method: "GET",
    options: {
      timeout: 5000,
    },
  })
}

export type GetApiConfigOkResponse = OKResponse<"API_CONFIGURATION", "GET">
