/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { ApiDevice, FileTransferPostRequest } from "devices/api-device/models"

export const postFileTransfer = (
  device: ApiDevice,
  { transferId, chunkNumber, data }: FileTransferPostRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "FILE_TRANSFER",
    method: "POST",
    body: {
      transferId,
      chunkNumber,
      data,
    },
    options: {
      timeout: 10_000,
      retries: 2,
    },
  })
}
