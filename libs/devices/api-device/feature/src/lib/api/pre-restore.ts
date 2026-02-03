/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  ApiDevice,
  buildPreRestoreRequest,
  PreRestoreRequest,
} from "devices/api-device/models"

export const preRestore = (
  device: ApiDevice,
  { restoreId, features }: PreRestoreRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    ...buildPreRestoreRequest({ restoreId, features }),
    options: {
      timeout: 10_000,
      retries: 2,
    },
  })
}
