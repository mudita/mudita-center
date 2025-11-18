/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { ApiDevice, FileTransferDeleteRequest } from "devices/api-device/models"

export const deleteFileTransfer = (
  device: ApiDevice,
  { fileTransferId }: FileTransferDeleteRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "FILE_TRANSFER",
    method: "DELETE",
    body: {
      fileTransferId,
    },
  })
}
