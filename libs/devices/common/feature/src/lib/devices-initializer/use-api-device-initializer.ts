/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device, DeviceStatus } from "devices/common/models"
import { useQueryClient } from "@tanstack/react-query"
import { ApiDeviceErrorType } from "devices/api-device/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { useDeviceConfig, useDeviceMenu, useDeviceStatus } from "../queries"
import { useCallback } from "react"

export const useApiDeviceInitializer = (device: Device) => {
  const queryClient = useQueryClient()

  const { isLoading: isConfigLoading, isError: isConfigError } =
    useDeviceConfig(device)
  const {
    isLoading: isMenuLoading,
    isError: isMenuError,
    failureReason: menuFailureReason,
    failureCount: menuFailureCount,
  } = useDeviceMenu<ApiDeviceErrorType>(device)

  const setStatus = useCallback(
    (status: DeviceStatus) => {
      queryClient.setQueryData(useDeviceStatus.queryKey(device.path), status)
    },
    [device.path, queryClient]
  )

  if (!ApiDeviceSerialPort.isCompatible(device)) {
    return
  }

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
