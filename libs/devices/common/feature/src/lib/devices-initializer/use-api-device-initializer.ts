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
} from "../hooks"
import { useCallback, useEffect, useRef } from "react"
import { delay } from "app-utils/common"
import { useDeviceFreezer } from "app-serialport/renderer"
import { performSystemAction, useOutboxQuery } from "devices/api-device/feature"

export const useApiDeviceInitializer = (device: ApiDevice) => {
  const queryClient = useQueryClient()
  const freezeTimeoutRef = useRef<NodeJS.Timeout>(undefined)
  const { freeze, unfreeze } = useDeviceFreezer()

  const { isLoading: isConfigLoading, isError: isConfigError } =
    useDeviceConfigQuery(device)
  const {
    isLoading: isMenuLoading,
    isError: isMenuError,
    failureReason: menuFailureReason,
    failureCount: menuFailureCount,
  } = useDeviceMenuQuery<ApiDeviceErrorType>(device)
  const { data: status } = useDeviceStatusQuery(device)
  useOutboxQuery(device, status === DeviceStatus.Initialized)

  const setStatus = useCallback(
    (status: DeviceStatus) => {
      queryClient.setQueryData(useDeviceStatusQuery.queryKey(device.id), status)
    },
    [device.id, queryClient]
  )

  const determineStatus = useCallback(async () => {
    if (isConfigLoading || (isMenuLoading && menuFailureCount < 3)) {
      setStatus(DeviceStatus.Initializing)
      return
    }
    await delay(500)
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
  }, [
    isConfigError,
    isConfigLoading,
    isMenuError,
    isMenuLoading,
    menuFailureCount,
    menuFailureReason,
    setStatus,
  ])

  useEffect(() => {
    void performSystemAction(device, {
      action: "serial-port-setup",
      chunkSizeInBytes: 14_336 * 20,
      outboxEventsCounter: 100 * 5,
    })
  }, [device])

  useEffect(() => {
    void determineStatus()
  }, [determineStatus])

  useEffect(() => {
    if (status === DeviceStatus.Locked) {
      freeze(device, 3_000)
    }
    if (status === DeviceStatus.Initialized) {
      clearTimeout(freezeTimeoutRef.current)
      freezeTimeoutRef.current = setTimeout(() => {
        unfreeze(device)
      }, 3_000)
    }
  }, [device, freeze, menuFailureReason, status, unfreeze])
}
