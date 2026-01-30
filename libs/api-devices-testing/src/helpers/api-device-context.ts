/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSerialPortService } from "app-serialport/main"
import { ApiDevice } from "devices/api-device/models"
import { SerialPortDeviceId } from "app-serialport/models"
import { getSerialPortService } from "./get-serial-port-service"
import { waitForApiDevice } from "./get-api-device"

export type ApiDeviceContext = {
  service: AppSerialPortService
  device: ApiDevice
  deviceId: SerialPortDeviceId
  reset: () => Promise<void>
}

export const initApiDeviceContext = async (): Promise<ApiDeviceContext> => {
  const service = await getSerialPortService()
  const device = await waitForApiDevice(service)
  const deviceId = device.id

  return {
    service,
    device,
    deviceId,

    reset: async () => {
      return await service.reset(deviceId, { rescan: false })
    },
  }
}
