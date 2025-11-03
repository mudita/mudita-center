/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route, useParams } from "react-router"
import { FunctionComponent } from "react"
import { Device, DeviceStatus } from "devices/common/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  useDeviceMenuQuery,
  useDeviceStatusQuery,
} from "devices/common/feature"
import { ApiDevicePaths } from "devices/api-device/models"
import { DeviceLockedScreen } from "./screens/device-locked-screen"
import { McOverviewScreen } from "./screens/mc-overview-screen"
import { McAboutScreen } from "./screens/mc-about-screen"
import { DeviceManageFilesScreen } from "./screens/mc-file-manager/device-manage-files.screen"
import { DeviceManageFileFeature } from "./screens/mc-file-manager/device-manage-files.types"
import { McContactsScreen } from "./screens/mc-contacts-screen"
import { McContactsDuplicatesScreen } from "./screens/mc-contacts-duplicates-screen"

export const useApiDeviceRouter = (device?: Device) => {
  const activeApiDevice = ApiDeviceSerialPort.isCompatible(device)
    ? device
    : undefined

  const { data: menu, isSuccess } = useDeviceMenuQuery(activeApiDevice)
  const { data: status } = useDeviceStatusQuery(activeApiDevice)

  return {
    initialization:
      activeApiDevice &&
      (status === DeviceStatus.Locked ? (
        <Route index element={<DeviceLockedScreen />} />
      ) : (
        isSuccess && (
          <Route
            index
            element={<Navigate to={ApiDevicePaths.Index} replace />}
          />
        )
      )),
    dashboard: (
      <Route path={ApiDevicePaths.Index}>
        <Route
          index
          element={<Navigate to={menu?.items?.[0]?.path as string} replace />}
        />
        {menu?.items?.map((item) => {
          if (item.items?.length) {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<Navigate to={item.items[0].path} />}
              />
            )
          }
          return null
        })}
        <Route path={`${ApiDevicePaths.Index}/mc-overview`}>
          <Route index element={<McOverviewScreen />} />
          <Route path={"mc-about"} element={<McAboutScreen />} />
        </Route>
        <Route
          path={`${ApiDevicePaths.Index}/${DeviceManageFileFeature.Internal}`}
        >
          <Route
            path={DeviceManageFileFeature.Internal}
            element={
              <DeviceManageFilesScreen
                feature={DeviceManageFileFeature.Internal}
              />
            }
          />
          <Route
            path={DeviceManageFileFeature.External}
            element={
              <DeviceManageFilesScreen
                feature={DeviceManageFileFeature.External}
              />
            }
          />
        </Route>
        <Route path={`${ApiDevicePaths.Index}/mc-contacts`}>
          <Route path={"mc-contacts"} element={<McContactsScreen />} />
          <Route
            path={"mc-contacts-duplicates"}
            element={<McContactsDuplicatesScreen />}
          />
        </Route>
        <Route path={ApiDevicePaths.View} element={<GenericView />} />
      </Route>
    ),
  }
}

// Demo generic view component
const GenericView: FunctionComponent = () => {
  const { viewKey, subviewKey } = useParams()

  return (
    <div>
      <h1>View: {viewKey}</h1>
      {subviewKey ? <h2>Subview: {subviewKey}</h2> : <h2>No subview</h2>}
    </div>
  )
}
