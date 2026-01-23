/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort, OKResponse } from "devices/api-device/adapters"
import { ApiDevice, buildApiConfigRequest } from "devices/api-device/models"

export const getApiDeviceConfig = async (device: ApiDevice) => {
  return ApiDeviceSerialPort.request(device, {
    ...buildApiConfigRequest(),
    options: { timeout: 3000 },
  })
}

export type GetApiConfigOkResponse = OKResponse<"API_CONFIGURATION", "GET">
