/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { ApiDevice, FileTransferGetRequest } from "devices/api-device/models"

export const getFileTransfer = (
  device: ApiDevice,
  { transferId, chunkNumber }: FileTransferGetRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "FILE_TRANSFER",
    method: "GET",
    body: {
      transferId,
      chunkNumber,
    },
    options: {
      timeout: 10_000,
      retries: 2,
    },
  })
}
