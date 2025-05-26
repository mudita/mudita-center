/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useSelector } from "react-redux"
import { selectCurrentDevice } from "devices/common/feature"
import { useApiDeviceRouter } from "devices/api-device/routes"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const useDeviceRouter = () => {
  const currentDevice = useSelector(selectCurrentDevice)
  const apiDeviceRouter = useApiDeviceRouter(currentDevice)

  if (ApiDeviceSerialPort.isCompatible(currentDevice)) {
    return apiDeviceRouter
  }

  return null
}
