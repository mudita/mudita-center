/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  EntitiesFileDataRequest,
  GetEntitiesDataResponse200,
  GetEntitiesDataResponse202,
} from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const getEntitiesData = async (
  device: ApiDevice,
  entityType: EntitiesFileDataRequest["entityType"]
) => {
  const response = await ApiDeviceSerialPort.request(device, {
    endpoint: "ENTITIES_DATA",
    method: "GET",
    body: {
      entityType,
      responseType: "file",
    },
    options: {
      timeout: 10_000,
      retries: 2,
    },
  })

  if (!response.ok) {
    return response
  }

  if (response.status === 202) {
    return {
      ...response,
      status: 202,
      body: response.body as GetEntitiesDataResponse202,
    } as const
  }

  return {
    ...response,
    status: 200,
    body: response.body as GetEntitiesDataResponse200,
  } as const
}
