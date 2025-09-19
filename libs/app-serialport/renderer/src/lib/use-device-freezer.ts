/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { AppSerialPort } from "./app-serial-port"
import { Device } from "devices/common/models"

export const useDeviceFreezer = () => {
  const isDeviceFrozen = useCallback((device: Device) => {
    return AppSerialPort.isFrozen(device.id)
  }, [])

  const freeze = useCallback((device: Device, timeout?: number) => {
    if (device) {
      AppSerialPort.freeze(device.id, timeout)
    }
  }, [])

  const unfreeze = useCallback((device: Device) => {
    if (device) {
      AppSerialPort.unfreeze(device.id)
    }
  }, [])

  return { freeze, unfreeze, isDeviceFrozen }
}
