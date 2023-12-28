/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector } from "react-redux"
import { getDeviceInitializationStatus } from "Core/device-initialization/selectors/get-device-initialization-status.selector"
import { useEffect } from "react"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { getActiveDeviceTypeSelector } from "Core/device-manager/selectors/get-active-device-type.selector"
import { loadDeviceData } from "Core/device/actions/load-device-data.action"
import { useLocation } from "react-router"
import { URL_OVERVIEW } from "Core/__deprecated__/renderer/constants/urls"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"

const deviceDataIntervalTime = 10000

export const useWatchDeviceDataEffect = () => {
  const location = useLocation()
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceType = useSelector(getActiveDeviceTypeSelector)
  const deviceInitializationStatus = useSelector(getDeviceInitializationStatus)
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>

    if (location.pathname !== URL_OVERVIEW.root) {
      return
    }

    if (activeDeviceProcessing) {
      return
    }

    if (deviceInitializationStatus === DeviceInitializationStatus.Initialized) {
      intervalId = setInterval(async () => {
        dispatch(loadDeviceData())
      }, deviceDataIntervalTime)
    }

    return () => clearInterval(intervalId)
  }, [
    dispatch,
    activeDeviceType,
    deviceInitializationStatus,
    location,
    activeDeviceProcessing,
  ])
}
