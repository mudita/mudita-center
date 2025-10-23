/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, EntitiesJsonDataRequest } from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

interface GetEntitiesDataParams extends Partial<EntitiesJsonDataRequest> {
  entityType: string
}

export const getEntitiesData = (
  device: ApiDevice,
  { entityType, responseType = "json" }: GetEntitiesDataParams
) => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "ENTITIES_DATA",
    method: "GET",
    body: {
      entityType,
      responseType,
    },
  })
}
