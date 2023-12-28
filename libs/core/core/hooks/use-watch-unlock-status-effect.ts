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
import { getUnlockStatus } from "Core/device/actions/get-unlock-status.action"
import { DeviceType } from "Core/device/constants"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"
import { deviceUnlockedStatusSelector } from "Core/device/selectors/device-unlocked-status.selector"

const unlockStatusIntervalTime = 10000

// Manages Mudita Pure device unlock status during active connections.
export const useWatchUnlockStatus = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceType = useSelector(getActiveDeviceTypeSelector)
  const deviceInitializationStatus = useSelector(getDeviceInitializationStatus)
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const deviceUnlockedStatus = useSelector(deviceUnlockedStatusSelector)

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>

    if (activeDeviceType !== DeviceType.MuditaPure) {
      return
    }

    if (
      deviceInitializationStatus === DeviceInitializationStatus.Initialized ||
      deviceUnlockedStatus === false
    ) {
      if (activeDeviceProcessing) {
        return
      }

      intervalId = setInterval(async () => {
        dispatch(getUnlockStatus())
      }, unlockStatusIntervalTime)
    }

    return () => clearInterval(intervalId)
  }, [
    dispatch,
    activeDeviceType,
    deviceInitializationStatus,
    activeDeviceProcessing,
    deviceUnlockedStatus,
  ])
}
