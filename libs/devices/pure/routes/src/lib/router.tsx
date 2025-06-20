/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route } from "react-router"
import { useDeviceConfig, useDeviceStatus } from "devices/common/feature"
import { Typography } from "app-theme/ui"
import { Device, DeviceStatus } from "devices/common/models"
import { PureSerialPort } from "devices/pure/adapters"
import { PurePaths } from "devices/pure/models"
import { PureLockedPage } from "./pure-locked-page"
import { PureWarningPage } from "./pure-warning-page"

export const usePureRouter = (device?: Device) => {
  const activePure = PureSerialPort.isCompatible(device) ? device : undefined

  const { data: status } = useDeviceStatus(activePure)
  const { isSuccess: isConfigSuccess } = useDeviceConfig(activePure)

  return {
    initialization:
      activePure &&
      (status === DeviceStatus.Locked ? (
        <Route index element={<PureLockedPage />} />
      ) : status === DeviceStatus.Issue ? (
        <Route index element={<PureWarningPage device={activePure} />} />
      ) : (
        isConfigSuccess && (
          <Route index element={<Navigate to={PurePaths.Index} replace />} />
        )
      )),
    dashboard: (
      <Route path={PurePaths.Index}>
        <Route index element={<Navigate to={PurePaths.Overview} replace />} />
        <Route
          path={PurePaths.Overview}
          element={<Typography.H1>Pure Overview</Typography.H1>}
        />
        <Route
          path={PurePaths.Messages}
          element={<Typography.H1>Pure Messages</Typography.H1>}
        />
        <Route
          path={PurePaths.Contacts}
          element={<Typography.H1>Pure Contacts</Typography.H1>}
        />
        <Route
          path={PurePaths.Files}
          element={<Typography.H1>Pure Files</Typography.H1>}
        />
      </Route>
    ),
  }
}
