/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import CriticalBatteryLevelModal from "Core/connecting/components/critical-battery-level-modal/critical-battery-level-modal"

const CriticalBatteryLevelModalContainer: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()

  const handleClose = () => {
    dispatch(setDeviceInitializationStatus(DeviceInitializationStatus.Aborted))
    history.push(URL_MAIN.news)
  }

  return <CriticalBatteryLevelModal open closeModal={handleClose} />
}

export default CriticalBatteryLevelModalContainer
