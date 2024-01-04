/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import ConnectingContent from "Core/connecting/components/connecting-content.component"
import { getConnectedDevicesSelector } from "Core/device-manager/selectors/get-connected-devices.selector"
import { handleDeviceActivated } from "Core/device-manager/actions/handle-device-activated.action"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import AvailableDeviceListContainer from "Core/discovery-device/components/available-device-list.container"
import { registerDeviceConnectedListener } from "Core/device-manager/listeners/device-connected.listener"

const ConfiguredDevicesDiscovery: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const devices = useSelector(getConnectedDevicesSelector)

  const handleDeviceClick = (id: string) => {
    dispatch(handleDeviceActivated({ deviceId: id, history }))
  }

  useEffect(() => {
    dispatch(setDiscoveryStatus(DiscoveryStatus.Discovering))
  }, [history, dispatch])

  const [noNewDevicesDetectedState, setNoNewDevicesDetectedState] =
    useState<boolean>(false)

  useEffect(() => {
    if (devices.length === 1 && noNewDevicesDetectedState) {
      dispatch(handleDeviceActivated({ deviceId: devices[0].id, history }))
    }
  }, [history, dispatch, devices, noNewDevicesDetectedState])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const handler = () => {
      clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        setNoNewDevicesDetectedState(true)
      }, 5000)
    }
    handler()
    const deviceConnected = registerDeviceConnectedListener(handler)
    return () => {
      deviceConnected()
      clearTimeout(timeoutId)
    }
  }, [dispatch])

  if (devices.length > 1 && noNewDevicesDetectedState) {
    return <AvailableDeviceListContainer />
  } else {
    return <ConnectingContent />
  }
}

export default ConfiguredDevicesDiscovery
