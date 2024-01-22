/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { getDeviceInitializationStatus } from "Core/device-initialization/selectors/get-device-initialization-status.selector"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { deviceUnlockedStatusSelector } from "Core/device/selectors/device-unlocked-status.selector"
import { URL_DEVICE_INITIALIZATION } from "Core/__deprecated__/renderer/constants/urls"
import { registerActiveDeviceLockedListener } from "Core/device-manager/listeners/active-device-locked.listener"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"

export const useDeviceLockedEffect = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const activeDevice = useSelector(getActiveDevice)
  const deviceUnlockedStatus = useSelector(deviceUnlockedStatusSelector)
  const deviceInitializationStatus = useSelector(getDeviceInitializationStatus)
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  // Redirect to device initialization when it becomes locked (Redux event)
  useEffect(() => {
    if (
      deviceUnlockedStatus === false &&
      deviceInitializationStatus === DeviceInitializationStatus.Initialized &&
      !activeDeviceProcessing
    ) {
      history.push(URL_DEVICE_INITIALIZATION.root)
    }
  }, [
    dispatch,
    history,
    deviceUnlockedStatus,
    deviceInitializationStatus,
    activeDeviceProcessing,
  ])

  // Redirect to device initialization when it becomes locked (Main layer event)
  useEffect(() => {
    const handler = ({ path }: { path: string }) => {
      if (
        deviceInitializationStatus === DeviceInitializationStatus.Initialized &&
        activeDevice?.path === path &&
        !activeDeviceProcessing
      ) {
        history.push(URL_DEVICE_INITIALIZATION.root)
      }
    }

    const unregister = registerActiveDeviceLockedListener(handler)
    return () => {
      unregister()
    }
  }, [
    dispatch,
    history,
    activeDevice,
    deviceUnlockedStatus,
    deviceInitializationStatus,
    activeDeviceProcessing,
  ])
}
