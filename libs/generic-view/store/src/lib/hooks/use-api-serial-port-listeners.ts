/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "Core/device-manager/reducers/device-manager.interface"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { answerMain, DeviceManagerMainEvent } from "shared/utils"
import { detachDevice } from "../views/actions"
import { getAPIConfig } from "../get-api-config"

export const useAPISerialPortListeners = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>()

  useEffect(() => {
    const unregisterFailListener = answerMain(
      DeviceManagerMainEvent.DeviceConnectFailed,
      (properties) => {
        // todo: connection error handling
        console.log(properties)
      }
    )
    const unregisterConnectListener = answerMain(
      DeviceManagerMainEvent.DeviceConnected,
      (properties) => {
        const { id } = properties as Device
        dispatch(getAPIConfig({ deviceId: id }))
      }
    )
    const unregisterDetachedListener = answerMain(
      DeviceManagerMainEvent.DeviceDetached,
      (properties) => {
        const { id } = properties as Device
        dispatch(detachDevice({ deviceId: id }))
      }
    )
    return () => {
      unregisterDetachedListener()
      unregisterConnectListener()
      unregisterFailListener()
    }
  }, [])
}
