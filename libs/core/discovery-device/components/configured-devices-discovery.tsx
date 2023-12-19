/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"

const ConfiguredDevicesDiscovery: FunctionComponent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setDiscoveryStatus(DiscoveryStatus.Discovering))
  }, [dispatch])

  return <div>Devices Discovery View</div>
}

export default ConfiguredDevicesDiscovery
