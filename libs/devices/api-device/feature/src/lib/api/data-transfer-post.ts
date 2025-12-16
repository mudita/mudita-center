/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, DataTransferPostRequest } from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const dataTransferPost = (
  device: ApiDevice,
  body: DataTransferPostRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "DATA_TRANSFER",
    method: "POST",
    body,
  })
}
