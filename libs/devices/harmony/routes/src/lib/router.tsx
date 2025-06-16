/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route } from "react-router"
import { useDeviceMenu } from "devices/common/feature"
import { Typography } from "app-theme/ui"
import { HarmonySerialPort } from "devices/harmony/adapters"
import { HarmonyPaths } from "devices/harmony/models"
import { Device } from "devices/common/models"

export const useHarmonyRouter = (device?: Device) => {
  const activeHarmony = HarmonySerialPort.isCompatible(device)
    ? device
    : undefined

  const { isSuccess: isMenuSuccess } = useDeviceMenu(activeHarmony)

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
