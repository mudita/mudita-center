/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  EntitiesFileDataRequest,
  GetSingleEntityDataResponse,
} from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const getEntityData = async (
  device: ApiDevice,
  entityType: EntitiesFileDataRequest["entityType"],
  entityId: string
) => {
  const response = await ApiDeviceSerialPort.request(device, {
    endpoint: "ENTITIES_DATA",
    method: "GET",
    body: {
      entityType,
      entityId,
      responseType: "json",
    },
    options: {
      timeout: 10_000,
      retries: 2,
    },
  })

  if (!response.ok) {
    return response
  }

  return {
    ...response,
    body: response.body as GetSingleEntityDataResponse,
  } as const
}
