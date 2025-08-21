/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceStatus } from "devices/common/models"
import { useQueryClient } from "@tanstack/react-query"
import { ApiDevice, ApiDeviceErrorType } from "devices/api-device/models"
import {
  useDeviceConfigQuery,
  useDeviceMenuQuery,
  useDeviceStatusQuery,
} from "../queries"
import { useCallback } from "react"

export const useApiDeviceInitializer = (device: ApiDevice) => {
  const queryClient = useQueryClient()

  const { isLoading: isConfigLoading, isError: isConfigError } =
    useDeviceConfigQuery(device)
  const {
    isLoading: isMenuLoading,
    isError: isMenuError,
    failureReason: menuFailureReason,
    failureCount: menuFailureCount,
  } = useDeviceMenuQuery<ApiDeviceErrorType>(device)

  const setStatus = useCallback(
    (status: DeviceStatus) => {
      queryClient.setQueryData(
        useDeviceStatusQuery.queryKey(device.path),
        status
      )
    },
    [device.path, queryClient]
  )

  if (isConfigLoading || (isMenuLoading && menuFailureCount < 3)) {
    setStatus(DeviceStatus.Initializing)
    return
  }
  if (
    isConfigError ||
    (isMenuError && menuFailureReason !== ApiDeviceErrorType.DeviceLocked)
  ) {
    setStatus(DeviceStatus.CriticalError)
    return
  }
  if (menuFailureReason === ApiDeviceErrorType.DeviceLocked) {
    setStatus(DeviceStatus.Locked)
    return
  }
  setStatus(DeviceStatus.Initialized)
}
