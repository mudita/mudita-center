/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "Core/device-manager/reducers/device-manager.interface"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { answerMain, DeviceManagerMainEvent } from "shared/utils"
import { getAPIConfig } from "../get-api-config"

export const useAPISerialPortListeners = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>()

  useEffect(() => {
    const unregisterFailListener = answerMain(
      DeviceManagerMainEvent.DeviceConnectFailed,
      (properties) => {
        console.log(properties)
      }
    )
    const unregisterConnectListener = answerMain(
      DeviceManagerMainEvent.DeviceConnected,
      (properties) => {
        const { id } = properties as Device
        console.log(properties)
        dispatch(getAPIConfig({ deviceId: id }))
      }
    )
    return () => {
      unregisterConnectListener()
      unregisterFailListener()
    }
  }, [])
}
