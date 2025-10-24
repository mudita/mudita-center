/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  ApiDevice,
  PreBackupRequest,
  PreBackupResponse200,
  PreBackupResponse202,
} from "devices/api-device/models"

export const preBackup = async (
  device: ApiDevice,
  {
    backupId,
    features,
  }: Omit<PreBackupRequest, "features"> &
    Partial<Pick<PreBackupRequest, "features">>
) => {
  const response = await ApiDeviceSerialPort.request(device, {
    endpoint: "PRE_BACKUP",
    method: features ? "POST" : "GET",
    body: {
      backupId,
      ...(features ? { features } : {}),
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
      body: response.body as PreBackupResponse202,
    } as const
  }

  return {
    ...response,
    status: 200,
    body: response.body as PreBackupResponse200,
  } as const
}
