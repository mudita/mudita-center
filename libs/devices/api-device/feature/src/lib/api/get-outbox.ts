/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, buildOutboxGetRequest } from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const getOutbox = (device: ApiDevice) => {
  return ApiDeviceSerialPort.request(device, {
    ...buildOutboxGetRequest(),
    options: {
      timeout: 1_000,
      retries: 0,
    },
  })
}
