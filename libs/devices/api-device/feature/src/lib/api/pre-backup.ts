/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  ApiDevice,
  buildPreBackupGetRequest,
  buildPreBackupPostRequest,
  PreBackupGetRequest,
  PreBackupPostRequest,
  PreBackupResponse200,
  PreBackupResponse202,
} from "devices/api-device/models"

type SerialPortResponse = Awaited<
  ReturnType<typeof ApiDeviceSerialPort.request>
>

const normalizePreBackupResponse = (response: SerialPortResponse) => {
  if (!response.ok) {
    return response
  }

  if (response.status === 202) {
    return {
      ...response,
      status: 202,
      body: response.body as PreBackupResponse202,
    } as const
  }

  return {
    ...response,
    status: 200,
    body: response.body as PreBackupResponse200,
  } as const
}

const preBackupPost = async (
  device: ApiDevice,
  params: PreBackupPostRequest
) => {
  const response = await ApiDeviceSerialPort.request(device, {
    ...buildPreBackupPostRequest(params),
    options: preBackupRequestOptions,
  })

  return normalizePreBackupResponse(response)
}

const preBackupGet = async (device: ApiDevice, params: PreBackupGetRequest) => {
  const response = await ApiDeviceSerialPort.request(device, {
    ...buildPreBackupGetRequest(params),
    options: preBackupRequestOptions,
  })

  return normalizePreBackupResponse(response)
}

export const preBackup = async (
  device: ApiDevice,
  params: PreBackupGetRequest | PreBackupPostRequest
) => {
  if ("features" in params) {
    return preBackupPost(device, params)
  }

  return preBackupGet(device, params)
}

const preBackupRequestOptions = {
  timeout: 10_000,
  retries: 2,
} as const
