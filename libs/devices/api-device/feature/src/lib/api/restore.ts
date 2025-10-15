/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  ApiDevice,
  RestoreRequest,
  RestoreResponse200,
  RestoreResponse202,
} from "devices/api-device/models"

export const restore = async (
  device: ApiDevice,
  { restoreId, init }: RestoreRequest & { init?: boolean }
) => {
  const response = await ApiDeviceSerialPort.request(device, {
    endpoint: "RESTORE",
    method: init ? "POST" : "GET",
    body: {
      restoreId,
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
      body: response.body as RestoreResponse202,
    } as const
  }

  return {
    ...response,
    status: 200,
    body: response.body as RestoreResponse200,
  } as const
}
