/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  ApiDevice,
  buildPreFileTransferGetRequest,
  PreFileTransferGetRequest,
  PreFileTransferInProgressGetResponse,
  PreFileTransferReadyGetResponse,
} from "devices/api-device/models"

export const preGetFileTransfer = async (
  device: ApiDevice,
  req: PreFileTransferGetRequest
) => {
  const response = await ApiDeviceSerialPort.request(device, {
    ...buildPreFileTransferGetRequest(req),
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
      body: response.body as PreFileTransferInProgressGetResponse,
    } as const
  }

  return {
    ...response,
    status: 200,
    body: response.body as PreFileTransferReadyGetResponse,
  } as const
}
