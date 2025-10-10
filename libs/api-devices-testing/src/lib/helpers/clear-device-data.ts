/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { DeviceSystemActionsService } from "device/feature"

export const clearDeviceData = async (deviceProtocol: DeviceProtocol) => {
  const systemActionsService = new DeviceSystemActionsService(deviceProtocol)
  return await systemActionsService.clearDeviceData()
}
