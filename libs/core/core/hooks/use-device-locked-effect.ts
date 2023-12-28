/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getDeviceInitializationStatus } from "Core/device-initialization/selectors/get-device-initialization-status.selector"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { deviceUnlockedStatusSelector } from "Core/device/selectors/device-unlocked-status.selector"
import { URL_DEVICE_INITIALIZATION } from "Core/__deprecated__/renderer/constants/urls"
import { registerActiveDeviceLockedListener } from "Core/device-manager/listeners/active-device-locked.listener"

export const useDeviceLockedEffect = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const deviceUnlockedStatus = useSelector(deviceUnlockedStatusSelector)
  const deviceInitializationStatus = useSelector(getDeviceInitializationStatus)

  // Redirect to device initialization when it becomes locked (Redux event)
  useEffect(() => {
    // TODO: handle skipping during a processing (update, backup)
    if (
      deviceUnlockedStatus === false &&
      deviceInitializationStatus === DeviceInitializationStatus.Initialized
    ) {
      history.push(URL_DEVICE_INITIALIZATION.root)
    }
  }, [dispatch, history, deviceUnlockedStatus, deviceInitializationStatus])

  // Redirect to device initialization when it becomes locked (Main layer event)
  useEffect(() => {
    const activeDeviceLockedHandler = () => {
      // TODO: handle skipping during a processing (update, backup)
      if (
        deviceInitializationStatus === DeviceInitializationStatus.Initialized
      ) {
        history.push(URL_DEVICE_INITIALIZATION.root)
      }
    }

    const activeDeviceLocked = registerActiveDeviceLockedListener(
      activeDeviceLockedHandler
    )
    return () => {
      activeDeviceLocked()
    }
  }, [dispatch, history, deviceUnlockedStatus, deviceInitializationStatus])
}
