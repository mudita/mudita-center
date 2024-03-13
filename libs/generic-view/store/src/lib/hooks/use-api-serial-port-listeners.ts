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
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { DeviceType } from "Core/device"

export const useAPISerialPortListeners = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    const unregisterFailListener = answerMain<Device>(
      DeviceManagerMainEvent.DeviceConnectFailed,
      (properties) => {
        const { deviceType } = properties
        if (deviceType !== DeviceType.APIDevice) {
          return
        }
        // todo: connection error handling
        console.log(properties)
      }
    )
    const unregisterConnectListener = answerMain<Device>(
      DeviceManagerMainEvent.DeviceConnected,
      (properties) => {
        const { id, deviceType } = properties
        if (deviceType !== DeviceType.APIDevice) {
          return
        }
        dispatch(getAPIConfig({ deviceId: id }))
      }
    )
    const unregisterDetachedListener = answerMain<Device>(
      DeviceManagerMainEvent.DeviceDetached,
      (properties) => {
        const { id, deviceType } = properties
        if (deviceType !== DeviceType.APIDevice) {
          return
        }
        dispatch(detachDevice({ deviceId: id }))
      }
    )
    return () => {
      unregisterDetachedListener()
      unregisterConnectListener()
      unregisterFailListener()
    }
  }, [dispatch])
}
