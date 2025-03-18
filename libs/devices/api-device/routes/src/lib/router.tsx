/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route, useParams } from "react-router"
import { apiDevicePaths } from "./paths"
import {
  FunctionComponent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"
import { getMenuConfig } from "devices/api-device/feature"
import { AppDeviceInfo } from "devices/common/models"
import { registerMenuGroups, unregisterMenuGroups } from "app-routing/feature"
import { useDispatch } from "react-redux"
import { MenuIndex } from "app-routing/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { ApiDeviceErrorType, MenuConfig } from "devices/api-device/models"

export const useApiDeviceRouter = (currentDevice?: AppDeviceInfo) => {
  const dispatch = useDispatch()
  const [menu, setMenu] = useState<MenuConfig>()

  const apiDevice = ApiDeviceSerialPort.isCompatible(currentDevice)
    ? currentDevice
    : undefined

  const fetchMenu = useCallback(async () => {
    if (apiDevice) {
      const menuConfig = await getMenuConfig(apiDevice)
      if (menuConfig.ok) {
        setMenu(menuConfig.body)
      } else if (menuConfig.status === ApiDeviceErrorType.DeviceLocked) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        await fetchMenu()
      }
    }
  }, [apiDevice])

  const menuGroups = useMemo(() => {
    if (!menu) {
      return
    }
    return [
      {
        index: MenuIndex.Device,
        title: menu.title,
        items: menu.menuItems.map((item) => {
          const submenu = item.submenu?.map((submenu) => ({
            title: submenu.displayName,
            path: `${apiDevicePaths.index}/${item.feature}/${submenu.feature}`,
          }))
          return {
            title: item.displayName,
            icon: item.icon,
            path: `${apiDevicePaths.index}/${item.feature}`,
            items: submenu,
          }
        }),
      },
    ]
  }, [menu])

  useLayoutEffect(() => {
    void fetchMenu()
  }, [fetchMenu])

  useLayoutEffect(() => {
    if (menuGroups && apiDevice) {
      dispatch(registerMenuGroups(menuGroups))
    } else {
      dispatch(unregisterMenuGroups([MenuIndex.Device]))
    }
  }, [apiDevice, dispatch, menuGroups])

  if (!apiDevice || !menu) {
    return null
  }

  return (
    <Route path={"/generic"}>
      {menuGroups?.[0]?.items.map((item) => {
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
      <Route path={apiDevicePaths.view} element={<GenericView />} />
      {menuGroups?.[0] && (
        <Route index element={<Navigate to={menuGroups[0].items[0].path} />} />
      )}
    </Route>
  )
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
