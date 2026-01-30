/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { AppSerialPortService } from "app-serialport/main"
import { delay } from "app-utils/common"

export const waitForApiDevice = async (
  service: AppSerialPortService,
  {
    timeoutMs = 10_000,
    tickMs = 100,
  }: { timeoutMs?: number; tickMs?: number } = {}
): Promise<ApiDevice> => {
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    await service.detectChanges()
    const device = service
      .getCurrentDevices()
      .find(ApiDeviceSerialPort.isCompatible)

    if (device) {
      return device as ApiDevice
    }

    await delay(tickMs)
  }

  throw new Error("No compatible API device found (timeout)")
}
