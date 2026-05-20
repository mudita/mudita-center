/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  buildFileTransferPostRequest,
  FileTransferPostRequest,
} from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const postFileTransfer = (
  device: ApiDevice,
  req: FileTransferPostRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    ...buildFileTransferPostRequest(req),
    options: {
      timeout: 10_000,
      retries: 2,
    },
  })
}
