/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, DataTransferDeleteRequest } from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const dataTransferDelete = (
  device: ApiDevice,
  body: DataTransferDeleteRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "DATA_TRANSFER",
    method: "DELETE",
    body,
  })
}
