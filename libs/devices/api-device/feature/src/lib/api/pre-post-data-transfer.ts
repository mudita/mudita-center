/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  ApiDevice,
  PreFileTransferPostRequest,
} from "devices/api-device/models"

export const prePostDataTransfer = (
  device: ApiDevice,
  { filePath, fileSize, crc32 }: PreFileTransferPostRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "PRE_FILE_TRANSFER",
    method: "POST",
    body: {
      filePath,
      fileSize,
      crc32,
    },
    options: {
      timeout: 10_000,
      retries: 2,
    },
  })
}
