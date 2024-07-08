/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useState } from "react"
import { answerMain } from "shared/utils"
import { DeviceProtocolMainEvent } from "device-protocol/models"

export const useNoNewDevicesDetectedHook = () => {
  const [noNewDevicesDetectedState, setNoNewDevicesDetectedState] =
    useState<boolean>(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const handler = () => {
      clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        setNoNewDevicesDetectedState(true)
      }, 3000)
    }
    handler()
    const unregisterDeviceConnectedListener = answerMain(
      DeviceProtocolMainEvent.DeviceConnected,
      handler
    )
    return () => {
      unregisterDeviceConnectedListener()
      clearTimeout(timeoutId)
    }
  }, [])

  return noNewDevicesDetectedState
}
