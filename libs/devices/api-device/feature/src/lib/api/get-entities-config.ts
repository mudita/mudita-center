/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  buildEntitiesFileDataRequest,
  EntitiesFileDataRequest,
} from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const getEntitiesConfig = async (
  device: ApiDevice,
  entityType: EntitiesFileDataRequest["entityType"]
) => {
  return await ApiDeviceSerialPort.request(device, {
    ...buildEntitiesFileDataRequest({ entityType, responseType: "file" }),
    options: {
      timeout: 10_000,
      retries: 2,
    },
  })
}
