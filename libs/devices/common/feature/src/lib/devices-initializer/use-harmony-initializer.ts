/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceStatus } from "devices/common/models"
import { useQueryClient } from "@tanstack/react-query"
import {
  useDeviceConfigQuery,
  useDeviceMenuQuery,
  useDeviceStatusQuery,
} from "../hooks"
import { useCallback, useEffect } from "react"
import { Harmony, HarmonyErrorType } from "devices/harmony/models"
import { delay } from "app-utils/common"

export const useHarmonyInitializer = (device: Harmony) => {
  const queryClient = useQueryClient()

  const { isLoading: isConfigLoading, isError: isConfigError } =
    useDeviceConfigQuery(device)
  const { isLoading: isMenuLoading } =
    useDeviceMenuQuery<HarmonyErrorType>(device)

  const setStatus = useCallback(
    (status: DeviceStatus) => {
      queryClient.setQueryData(useDeviceStatusQuery.queryKey(device.id), status)
    },
    [device.id, queryClient]
  )

  const determineStatus = useCallback(async () => {
    if (isConfigLoading || isMenuLoading) {
      setStatus(DeviceStatus.Initializing)
      return
    }
    await delay(500)

    if (isConfigError) {
      setStatus(DeviceStatus.CriticalError)
      return
    }
    setStatus(DeviceStatus.Initialized)
  }, [isConfigError, isConfigLoading, isMenuLoading, setStatus])

  useEffect(() => {
    void determineStatus()
  }, [determineStatus])
}
