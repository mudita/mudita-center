/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, EntitiesFileDataRequest } from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const getEntitiesConfig = async (
  device: ApiDevice,
  entityType: EntitiesFileDataRequest["entityType"]
) => {
  return await ApiDeviceSerialPort.request(device, {
    endpoint: "ENTITIES_CONFIGURATION",
    method: "GET",
    body: {
      entityType,
    },
    options: {
      timeout: 10_000,
      retries: 2,
    },
  })
}
