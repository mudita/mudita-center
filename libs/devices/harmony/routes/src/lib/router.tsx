/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route } from "react-router"
import { useDeviceMenuQuery } from "devices/common/feature"
import { HarmonySerialPort } from "devices/harmony/adapters"
import { HarmonyPaths } from "devices/harmony/models"
import { Device } from "devices/common/models"
import { HarmonyOverviewScreen } from "./screens/overview/harmony-overview.screen"
import { HarmonyManageFilesScreen } from "./screens/manage-files/harmony-manage-files.screen"

export const useHarmonyRouter = (device?: Device) => {
  const activeHarmony = HarmonySerialPort.isCompatible(device)
    ? device
    : undefined

  const { isSuccess: isMenuSuccess } = useDeviceMenuQuery(activeHarmony)

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
          element={<HarmonyOverviewScreen />}
        />
        <Route
          path={HarmonyPaths.Sounds}
          element={<HarmonyManageFilesScreen />}
        />
      </Route>
    ),
  }
}
