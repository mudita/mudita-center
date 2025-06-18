/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route, useParams } from "react-router"
import { FunctionComponent } from "react"
import { Device, DeviceStatus } from "devices/common/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { useDeviceMenu, useDeviceStatus } from "devices/common/feature"
import { ApiDevicePaths } from "devices/api-device/models"
import { DeviceLockedPage } from "./device-locked-page"

export const useApiDeviceRouter = (device?: Device) => {
  const activeApiDevice = ApiDeviceSerialPort.isCompatible(device)
    ? device
    : undefined

  const { data: menu, isSuccess } = useDeviceMenu(activeApiDevice)
  const { data: status } = useDeviceStatus(activeApiDevice)

  return {
    initialization:
      activeApiDevice &&
      (status === DeviceStatus.Locked ? (
        <Route index element={<DeviceLockedPage />} />
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
