/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceStatus } from "devices/common/models"
import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect } from "react"
import { delay } from "app-utils/common"
import { Harmony, HarmonyErrorType } from "devices/harmony/models"
import {
  useHarmonyOsUpdateInfoQuery,
  useNewCrashDumpsQuery,
} from "devices/harmony/feature"
import {
  useDeviceConfigQuery,
  useDeviceMenuQuery,
  useDeviceStatusQuery,
} from "../hooks"
import { TrackEventCategory, useUniqueTrack } from "app-utils/renderer"

export const useHarmonyInitializer = (device: Harmony) => {
  const queryClient = useQueryClient()

  const {
    data: config,
    isLoading: isConfigLoading,
    isError: isConfigError,
  } = useDeviceConfigQuery(device)
  const { isLoading: isMenuLoading } =
    useDeviceMenuQuery<HarmonyErrorType>(device)

  const { isLoading: isUpdateCheckLoading } = useHarmonyOsUpdateInfoQuery({
    device: device,
    currentVersion: config?.version,
    serialNumber: config?.serialNumber,
  })

  const { isLoading: isLogsLoading } = useNewCrashDumpsQuery(device)

  const uniqueTrack = useUniqueTrack()

  const setStatus = useCallback(
    (status: DeviceStatus) => {
      queryClient.setQueryData(useDeviceStatusQuery.queryKey(device.id), status)
    },
    [device.id, queryClient]
  )

  const determineStatus = useCallback(async () => {
    if (
      isConfigLoading ||
      isMenuLoading ||
      isUpdateCheckLoading ||
      isLogsLoading
    ) {
      setStatus(DeviceStatus.Initializing)
      return
    }

    await delay(500)

    if (isConfigError) {
      setStatus(DeviceStatus.CriticalError)
      return
    }
    setStatus(DeviceStatus.Initialized)

    uniqueTrack({
      e_a: config?.version || "unknown",
      e_c: TrackEventCategory.HarmonyVersion,
      _id: config?.serialNumber || "unknown",
    })
  }, [
    isConfigError,
    isConfigLoading,
    isMenuLoading,
    isUpdateCheckLoading,
    isLogsLoading,
    setStatus,
    config,
    uniqueTrack,
  ])

  useEffect(() => {
    void determineStatus()
  }, [determineStatus])
}
