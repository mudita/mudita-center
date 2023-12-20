/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { History } from "history"
import { DeviceBaseProperty } from "Core/device-manager/reducers/device-manager.interface"
import { handleDeviceConnected } from "Core/device-manager/actions/handle-device-connected.action"
import { registerDeviceConnectedListener } from "Core/device-manager/listeners/device-connected.listener"
import { Dispatch } from "Core/__deprecated__/renderer/store"

export const useDeviceConnectedEffect = (history: History) => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    const onDeviceConnectedHandler = async (property: DeviceBaseProperty) => {
      await dispatch(handleDeviceConnected({ property, history }))
    }

    const deviceConnected = registerDeviceConnectedListener(
      onDeviceConnectedHandler
    )
    return () => {
      deviceConnected()
    }
  }, [dispatch, history])
}
