/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  PreDataTransferPostRequest,
} from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const preDataTransferPost = (
  device: ApiDevice,
  body: PreDataTransferPostRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "PRE_DATA_TRANSFER",
    method: "POST",
    body,
  })
}
