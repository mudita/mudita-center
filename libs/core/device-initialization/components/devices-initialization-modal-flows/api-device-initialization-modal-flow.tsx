/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"

export const APIDeviceInitializationModalFlow: FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch>()
  const history = useHistory()

  useEffect(() => {
    history.push(`generic/mc-overview`)

    dispatch(
      setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
    )
  }, [history, dispatch])

  return <></>
}
