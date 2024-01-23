/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import { deactivateDevice } from "Core/device-manager/actions/deactivate-device.action"
import {
  URL_DISCOVERY_DEVICE,
  URL_MAIN,
} from "Core/__deprecated__/renderer/constants/urls"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"

export const useHandleActiveDeviceAborted = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const devices = useSelector(getDevicesSelector)

  return useCallback(() => {
    void dispatch(deactivateDevice())
    dispatch(setDiscoveryStatus(DiscoveryStatus.Aborted))
    dispatch(setDeviceInitializationStatus(DeviceInitializationStatus.Aborted))
    if (devices.length > 1) {
      history.push(URL_DISCOVERY_DEVICE.availableDeviceListModal)
    } else {
      history.push(URL_MAIN.news)
    }
  }, [devices, history, dispatch])
}
