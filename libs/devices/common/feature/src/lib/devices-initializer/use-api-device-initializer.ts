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
import { useCallback, useEffect } from "react"
import { delay } from "app-utils/common"
import { useDeviceFreezer } from "app-serialport/renderer"
import { performSystemAction, useOutboxQuery } from "devices/api-device/feature"

const DEFAULT_CHUNK_SIZE_IN_BYTES = 14_336
const DEFAULT_OUTBOX_EVENTS_COUNTER = 100

export const useApiDeviceInitializer = (device: ApiDevice) => {
  const queryClient = useQueryClient()
  const { freeze, unfreeze } = useDeviceFreezer()

  const { isLoading: isConfigLoading, isError: isConfigError } =
    useDeviceConfigQuery(device)
  const {
    isLoading: isMenuLoading,
    isError: isMenuError,
    failureReason: menuFailureReason,
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
    if (
      !isConfigError &&
      menuFailureReason === ApiDeviceErrorType.DeviceLocked
    ) {
      setStatus(DeviceStatus.Locked)
      return
    }
    if (isConfigError || isMenuError) {
      setStatus(DeviceStatus.CriticalError)
      return
    }
    if (isConfigLoading || isMenuLoading) {
      setStatus(DeviceStatus.Initializing)
      return
    }
    await delay(500)

    setStatus(DeviceStatus.Initialized)
  }, [
    isConfigError,
    isConfigLoading,
    isMenuError,
    isMenuLoading,
    menuFailureReason,
    setStatus,
  ])

  useEffect(() => {
    void determineStatus()
  }, [determineStatus])

  useEffect(() => {
    if (status === DeviceStatus.Initialized) {
      void performSystemAction(device, {
        action: "serial-port-setup",
        chunkSizeInBytes: DEFAULT_CHUNK_SIZE_IN_BYTES * 20,
        outboxEventsCounter: DEFAULT_OUTBOX_EVENTS_COUNTER * 5,
      })
    }
  }, [device, status])

  useEffect(() => {
    if (status === DeviceStatus.Locked) {
      freeze(device, 10_000)
    }
    if (status === DeviceStatus.Initialized) {
      unfreeze(device)
    }
  }, [device, freeze, status, unfreeze])
}
