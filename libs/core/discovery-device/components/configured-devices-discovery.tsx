/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import ConnectingContent from "Core/connecting/components/connecting-content.component"
import { useHistory } from "react-router-dom"
import { getConnectedDevicesSelector } from "Core/device-manager/selectors/get-connected-devices.selector"
import { handleDeviceActivated } from "Core/device-manager/actions/handle-device-activated.action"
import { Dispatch } from "Core/__deprecated__/renderer/store"

const ConfiguredDevicesDiscovery: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const devices = useSelector(getConnectedDevicesSelector)

  useEffect(() => {
    dispatch(setDiscoveryStatus(DiscoveryStatus.Discovering))
  }, [history, dispatch])

  useEffect(() => {
    // TODO: handle discovering logic
    if (devices.length > 0) {
      dispatch(handleDeviceActivated({ deviceId: devices[0].id, history }))
    }
  }, [history, dispatch, devices])

  return <ConnectingContent />
}

export default ConfiguredDevicesDiscovery
