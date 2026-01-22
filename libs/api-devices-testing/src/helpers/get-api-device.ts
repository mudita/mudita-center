/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { getSerialPortService } from "./get-serial-port-service"

export const getApiDevice = async (): Promise<ApiDevice> => {
  const serialPortService = await getSerialPortService()
  const device = serialPortService.getCurrentDevices()[0]

  if (ApiDeviceSerialPort.isCompatible(device)) {
    return device
  } else {
    throw new Error("No compatible API device found")
  }
}
