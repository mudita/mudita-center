/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  buildRestoreGetRequest,
  buildRestorePostRequest,
  RestoreRequest,
  RestoreResponse200,
  RestoreResponse202,
} from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

type SerialPortResponse = Awaited<
  ReturnType<typeof ApiDeviceSerialPort.request>
>

const normalizeRestoreResponse = (response: SerialPortResponse) => {
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

const restorePost = async (device: ApiDevice, req: RestoreRequest) => {
  const response = await ApiDeviceSerialPort.request(device, {
    ...buildRestorePostRequest(req),
    options: restoreRequestOptions,
  })

  return normalizeRestoreResponse(response)
}

const restoreGet = async (device: ApiDevice, req: RestoreRequest) => {
  const response = await ApiDeviceSerialPort.request(device, {
    ...buildRestoreGetRequest(req),
    options: restoreRequestOptions,
  })

  return normalizeRestoreResponse(response)
}

export const restore = async (device: ApiDevice, req: RestoreRequest) => {
  if ("features" in req) {
    return restorePost(device, req)
  }

  return restoreGet(device, req)
}

const restoreRequestOptions = {
  timeout: 10_000,
  retries: 2,
} as const
