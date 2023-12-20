/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import ConnectingContent from "Core/connecting/components/connecting-content.component"
import { startInitializingDevice } from "Core/device-initialization/actions/start-initializing-device"
import { Dispatch } from "Core/__deprecated__/renderer/store"

const DevicesInitialization: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch(startInitializingDevice(history))
  }, [history, dispatch])

  return <ConnectingContent />
}

export default DevicesInitialization
