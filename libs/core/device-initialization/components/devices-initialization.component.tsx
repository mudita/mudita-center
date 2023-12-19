/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"

const DevicesInitialization: FunctionComponent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setDeviceInitializationStatus(DeviceInitializationStatus.Initializing))
  }, [dispatch])

  return <div>Devices Initialization View</div>
}

export default DevicesInitialization
