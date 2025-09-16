/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { AppSerialPort } from "app-serialport/renderer"
import { useActiveDeviceQuery } from "./use-active-device.query"
import { Device } from "devices/common/models"

export const useDeviceFreezer = () => {
  const { data: activeDevice } = useActiveDeviceQuery()

  const isDeviceFrozen = useCallback((device: Device) => {
    return AppSerialPort.isFrozen(device.path)
  }, [])

  const freeze = useCallback(
    (device = activeDevice, timeout?: number) => {
      if (device) {
        AppSerialPort.freeze(device.path, timeout)
      }
    },
    [activeDevice]
  )

  const unfreeze = useCallback(
    (device = activeDevice) => {
      if (device) {
        AppSerialPort.unfreeze(device.path)
      }
    },
    [activeDevice]
  )

  return { freeze, unfreeze, isDeviceFrozen }
}
