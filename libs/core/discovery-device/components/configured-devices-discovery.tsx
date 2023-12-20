/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import ConnectingContent from "Core/connecting/components/connecting-content.component"
import { useHistory } from "react-router-dom"
import { URL_DEVICE_INITIALIZATION } from "Core/__deprecated__/renderer/constants/urls"

const ConfiguredDevicesDiscovery: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    // TODO: handle discovering logic
    dispatch(setDiscoveryStatus(DiscoveryStatus.Discovered))
    history.push(URL_DEVICE_INITIALIZATION.root)

  }, [history, dispatch])

  return <ConnectingContent />
}

export default ConfiguredDevicesDiscovery

