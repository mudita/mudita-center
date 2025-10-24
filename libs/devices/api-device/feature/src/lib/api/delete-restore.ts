/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { ApiDevice, DeleteRestoreRequest } from "devices/api-device/models"

export const deleteRestore = async (
  device: ApiDevice,
  { restoreId }: DeleteRestoreRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "RESTORE",
    method: "DELETE",
    body: {
      restoreId,
    },
    options: {
      timeout: 10_000,
      retries: 2,
    },
  })
}
