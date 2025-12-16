/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, DataTransferGetRequest } from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const dataTransferGet = (
  device: ApiDevice,
  body: DataTransferGetRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "DATA_TRANSFER",
    method: "GET",
    body,
  })
}
