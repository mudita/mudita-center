/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { handleDeviceConnected } from "Core/device-manager/actions/handle-device-connected.action"
import { registerDeviceConnectedListener } from "Core/device-manager/listeners/device-connected.listener"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"

export const useDeviceConnectedEffect = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    const onDeviceConnectedHandler = async (properties: DeviceBaseProperties) => {
      await dispatch(handleDeviceConnected({ properties, history }))
    }

    const deviceConnected = registerDeviceConnectedListener(
      onDeviceConnectedHandler
    )
    return () => {
      deviceConnected()
    }
  }, [dispatch, history])
}
