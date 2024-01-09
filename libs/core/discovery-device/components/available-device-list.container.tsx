/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import AvailableDeviceList from "Core/discovery-device/components/available-device-list.component"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import { handleDeviceActivated } from "Core/device-manager/actions/handle-device-activated.action"
import { Dispatch } from "Core/__deprecated__/renderer/store"

const AvailableDeviceListContainer: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const devices = useSelector(getDevicesSelector)

  const handleDeviceClick = (id: string) => {
    dispatch(handleDeviceActivated({ deviceId: id, history }))
  }

  return (
    <AvailableDeviceList onDeviceClick={handleDeviceClick} devices={devices} />
  )
}

export default AvailableDeviceListContainer
