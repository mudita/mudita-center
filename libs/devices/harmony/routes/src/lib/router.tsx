/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route } from "react-router"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { DeviceStatus } from "devices/common/models"
import {
  Device,
  useDeviceConfig,
  useDeviceMenu,
  useDeviceStatus,
} from "devices/common/feature"
import { Typography } from "app-theme/ui"
import { HarmonySerialPort } from "devices/harmony/adapters"
import { HarmonyPaths } from "devices/harmony/models"

export const useHarmonyRouter = (device?: Device) => {
  const queryClient = useQueryClient()

  const activeHarmony = HarmonySerialPort.isCompatible(device)
    ? device
    : undefined

  const { isLoading: isConfigLoading, isError: isConfigError } =
    useDeviceConfig(activeHarmony)
  const { isLoading: isMenuLoading, isSuccess: isMenuSuccess } =
    useDeviceMenu(activeHarmony)

  useEffect(() => {
    if (!activeHarmony) {
      return
    }

    if (isConfigLoading || isMenuLoading) {
      queryClient.setQueryData(
        useDeviceStatus.queryKey(activeHarmony.path),
        DeviceStatus.Initializing
      )
      return
    }
    if (isConfigError) {
      queryClient.setQueryData(
        useDeviceStatus.queryKey(activeHarmony.path),
        DeviceStatus.CriticalError
      )
      return
    }
    queryClient.setQueryData(
      useDeviceStatus.queryKey(activeHarmony.path),
      DeviceStatus.Initialized
    )
  }, [
    activeHarmony,
    isConfigError,
    isConfigLoading,
    isMenuLoading,
    queryClient,
  ])

  return {
    initialization: activeHarmony && isMenuSuccess && (
      <Route index element={<Navigate to={HarmonyPaths.Index} replace />} />
    ),
    dashboard: (
      <Route path={HarmonyPaths.Index}>
        <Route
          index
          element={<Navigate to={HarmonyPaths.Overview} replace />}
        />
        <Route
          path={HarmonyPaths.Overview}
          element={<Typography.H1>Harmony Overview</Typography.H1>}
        />
        <Route
          path={HarmonyPaths.Sounds}
          element={<Typography.H1>Harmony Sounds</Typography.H1>}
        />
      </Route>
    ),
  }
}
