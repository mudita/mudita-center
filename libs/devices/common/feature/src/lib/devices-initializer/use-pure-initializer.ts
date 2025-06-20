/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceStatus } from "devices/common/models"
import { useQueryClient } from "@tanstack/react-query"
import { useDeviceConfig, useDeviceStatus } from "../queries"
import { useCallback } from "react"
import { Pure, PureErrorType } from "devices/pure/models"

export const usePureInitializer = (device: Pure) => {
  const queryClient = useQueryClient()

  const { isLoading: isConfigLoading, failureReason: configFailureReason } =
    useDeviceConfig(device)

  const setStatus = useCallback(
    (status: DeviceStatus) => {
      queryClient.setQueryData(useDeviceStatus.queryKey(device.path), status)
    },
    [device.path, queryClient]
  )

  const isExpectedError =
    configFailureReason &&
    (configFailureReason === PureErrorType.DeviceLocked ||
      configFailureReason === PureErrorType.EulaNotAccepted ||
      configFailureReason === PureErrorType.BatteryFlat)

  if (isConfigLoading && !isExpectedError) {
    setStatus(DeviceStatus.Initializing)
    return
  }

  if (configFailureReason && !isExpectedError) {
    setStatus(DeviceStatus.CriticalError)
    return
  }

  if (
    configFailureReason === PureErrorType.EulaNotAccepted ||
    configFailureReason === PureErrorType.BatteryFlat
  ) {
    setStatus(DeviceStatus.Issue)
    return
  }

  if (configFailureReason === PureErrorType.DeviceLocked) {
    setStatus(DeviceStatus.Locked)
    return
  }

  setStatus(DeviceStatus.Initialized)
}
