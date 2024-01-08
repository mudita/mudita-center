/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { answerMain } from "./answer-main"
import { DeviceManagerMainEvent } from "Core/device-manager/constants"

export const useAPISerialPortListeners = () => {
  useEffect(() => {
    const unregisterFailListener = answerMain(
      DeviceManagerMainEvent.DeviceConnectFailed,
      (properties) => {
        console.log(properties)
      }
    )

    return () => {
      unregisterFailListener()
    }
  }, [])
}
