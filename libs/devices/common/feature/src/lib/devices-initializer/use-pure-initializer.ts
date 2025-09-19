/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceStatus } from "devices/common/models"
import { useQueryClient } from "@tanstack/react-query"
import { useDeviceConfigQuery, useDeviceStatusQuery } from "../hooks"
import { useCallback, useEffect } from "react"
import { Pure, PureErrorType } from "devices/pure/models"
import { delay } from "app-utils/common"

export const usePureInitializer = (device: Pure) => {
  const queryClient = useQueryClient()

  const { isLoading: isConfigLoading, failureReason: configFailureReason } =
    useDeviceConfigQuery(device)

  const setStatus = useCallback(
    (status: DeviceStatus) => {
      queryClient.setQueryData(useDeviceStatusQuery.queryKey(device.id), status)
    },
    [device.id, queryClient]
  )

  const isExpectedError =
    configFailureReason &&
    (configFailureReason === PureErrorType.DeviceLocked ||
      configFailureReason === PureErrorType.EulaNotAccepted ||
      configFailureReason === PureErrorType.BatteryFlat)

  const determineStatus = useCallback(async () => {
    if (isConfigLoading && !isExpectedError) {
      setStatus(DeviceStatus.Initializing)
      return
    }
    await delay(500)
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
  }, [configFailureReason, isConfigLoading, isExpectedError, setStatus])

  useEffect(() => {
    void determineStatus()
  }, [determineStatus])
}
