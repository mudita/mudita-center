/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  buildSystemPostRequest,
  SystemPostRequest,
} from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const performSystemAction = async (
  device: ApiDevice,
  action: SystemPostRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    ...buildSystemPostRequest(action),
    options: {
      timeout: 5_000,
      retries: 2,
    },
  })
}
