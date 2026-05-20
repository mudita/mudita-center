/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  buildPreFileTransferPostRequest,
  PreFileTransferPostRequest,
} from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const prePostDataTransfer = (
  device: ApiDevice,
  req: PreFileTransferPostRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    ...buildPreFileTransferPostRequest(req),
    options: {
      timeout: 10_000,
      retries: 2,
    },
  })
}
