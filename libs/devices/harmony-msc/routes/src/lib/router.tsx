/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route } from "react-router"
import { Button, Typography } from "app-theme/ui"
import { Device } from "devices/common/models"
import { HarmonyMscSerialPort } from "devices/harmony-msc/adapters"
import { HarmonyMscPaths } from "devices/harmony-msc/models"
import { FunctionComponent } from "react"
import { flashHarmonyMsc } from "devices/harmony-msc/feature"
import { useActiveDevice } from "devices/common/feature"

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
        <Route path={HarmonyMscPaths.RecoveryMode} element={<Demo />} />
      </Route>
    ),
  }
}

const Demo: FunctionComponent = () => {
  const { data: activeHarmony } = useActiveDevice()
  const onClick = () => {
    if (activeHarmony && HarmonyMscSerialPort.isCompatible(activeHarmony)) {
      void flashHarmonyMsc(activeHarmony, {
        imagePath: "/path/to/image",
        scriptPath: "path/to/script",
      })
    }
  }
  return (
    <>
      <Typography.H1>Recovery mode</Typography.H1>
      <Button onClick={onClick}>Test</Button>
    </>
  )
}
