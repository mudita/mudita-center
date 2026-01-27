/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  buildPatchEntityDataRequest,
  PatchEntityDataRequest,
} from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const patchEntityData = (
  device: ApiDevice,
  body: PatchEntityDataRequest
) => {
  return ApiDeviceSerialPort.request(device, buildPatchEntityDataRequest(body))
}
