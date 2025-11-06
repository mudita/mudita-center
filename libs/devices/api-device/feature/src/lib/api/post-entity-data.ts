/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, PostEntityDataRequest } from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const postEntityData = (
  device: ApiDevice,
  body: PostEntityDataRequest
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "ENTITIES_DATA",
    method: "POST",
    body,
  })
}
