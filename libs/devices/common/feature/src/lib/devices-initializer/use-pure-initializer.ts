/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceStatus } from "devices/common/models"
import { useQueryClient } from "@tanstack/react-query"
import { useDeviceConfig, useDeviceMenu, useDeviceStatus } from "../queries"
import { useCallback } from "react"
import { Pure, PureErrorType } from "devices/pure/models"
import { isPureBatteryFlat, usePureLockedInfo } from "devices/pure/feature"

export const usePureInitializer = (device: Pure) => {
  const queryClient = useQueryClient()

  const {
    data: isLocked,
    isError: isLockedError,
    isLoading,
  } = usePureLockedInfo(device)
  const {
    data: config,
    isLoading: isConfigLoading,
    isError: isConfigError,
  } = useDeviceConfig(isLocked === false ? device : undefined)
  const { isLoading: isMenuLoading } = useDeviceMenu<PureErrorType>(
    isLocked === false ? device : undefined
  )

  const setStatus = useCallback(
    (status: DeviceStatus) => {
      queryClient.setQueryData(useDeviceStatus.queryKey(device.path), status)
    },
    [device.path, queryClient]
  )

  if (isConfigLoading || isMenuLoading || isLoading) {
    setStatus(DeviceStatus.Initializing)
    return
  }
  if (isLocked) {
    setStatus(DeviceStatus.Locked)
    return
  }
  if (isPureBatteryFlat(config?.batteryLevel)) {
    setStatus(DeviceStatus.Warning)
    return
  }
  if (isConfigError || isLockedError) {
    setStatus(DeviceStatus.CriticalError)
    return
  }

  setStatus(DeviceStatus.Initialized)
}
