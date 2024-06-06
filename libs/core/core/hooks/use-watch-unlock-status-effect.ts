/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDeviceInitializationStatus } from "Core/device-initialization/selectors/get-device-initialization-status.selector"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { getActiveDeviceTypeSelector } from "device-manager/feature"
import { isActiveDeviceProcessingSelector } from "Core/device/selectors/is-active-device-processing.selector"
import { getUnlockStatus } from "Core/device/actions/get-unlock-status.action"
import { DeviceType } from "device-protocol/models"

const unlockStatusIntervalTime = 10000

// Manages Mudita Pure device unlock status during active connections.
export const useWatchUnlockStatus = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceType = useSelector(getActiveDeviceTypeSelector)
  const deviceInitializationStatus = useSelector(getDeviceInitializationStatus)
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)

  useEffect(() => {
    if (activeDeviceType !== DeviceType.MuditaPure) {
      return
    }

    if (deviceInitializationStatus !== DeviceInitializationStatus.Initialized) {
      return
    }

    const intervalId = setInterval(async () => {
      dispatch(getUnlockStatus())
    }, unlockStatusIntervalTime)

    return () => clearInterval(intervalId)
  }, [
    dispatch,
    activeDeviceType,
    deviceInitializationStatus,
    activeDeviceProcessing,
  ])
}
