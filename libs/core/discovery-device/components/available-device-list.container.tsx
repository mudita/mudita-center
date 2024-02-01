/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import AvailableDeviceList from "Core/discovery-device/components/available-device-list.component"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"

const AvailableDeviceListContainer: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const devices = useSelector(getDevicesSelector)

  useEffect(() => {
    dispatch(setDiscoveryStatus(DiscoveryStatus.Discovering))
  }, [dispatch])

  useEffect(() => {
    if (devices.length === 0) {
      dispatch(setDiscoveryStatus(DiscoveryStatus.Aborted))
      history.push(URL_MAIN.news)
    }
  }, [dispatch, history, devices.length])

  return <AvailableDeviceList />
}

export default AvailableDeviceListContainer
