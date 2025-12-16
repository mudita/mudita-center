/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route } from "react-router"
import { Device } from "devices/common/models"
import { HarmonyMscSerialPort } from "devices/harmony-msc/adapters"
import { HarmonyMscPaths } from "devices/harmony-msc/models"
import { McHarmonyMscRecoveryModeScreen } from "./harmony-msc-recovery-mode.screen"

export const useHarmonyMscRouter = (device?: Device) => {
  const activeHarmony = HarmonyMscSerialPort.isCompatible(device)
    ? device
    : undefined

  return {
    initialization: activeHarmony && (
      <Route index element={<Navigate to={HarmonyMscPaths.Index} replace />} />
    ),
    dashboard: (
      <Route path={HarmonyMscPaths.Index}>
        <Route
          index
          element={<Navigate to={HarmonyMscPaths.RecoveryMode} replace />}
        />
        <Route
          path={HarmonyMscPaths.RecoveryMode}
          element={<McHarmonyMscRecoveryModeScreen />}
        />
      </Route>
    ),
  }
}
