/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { buildSystemPostRequest } from "devices/api-device/models"
import { getApiDevice } from "./get-api-device"
import { getSerialPortService } from "./get-serial-port-service"

export const clearDeviceData = async () => {
  const device = await getApiDevice()
  const serialPortService = await getSerialPortService()
  return await serialPortService.request(
    device.id,
    buildSystemPostRequest({
      action: "clearData",
    })
  )
}
