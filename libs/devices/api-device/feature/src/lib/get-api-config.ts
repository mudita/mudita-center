/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "api-device/adapters"
import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
} from "app-serialport/models"

export const getApiConfig = async (
  device: SerialPortDeviceInfo<SerialPortDeviceType.ApiDevice>
) => {
  return await ApiDeviceSerialPort.request(device, {
    endpoint: "API_CONFIGURATION",
    method: "GET",
    options: {
      timeout: 2000,
      retries: 3,
    },
  })
}
