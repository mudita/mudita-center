/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch } from "react-redux"
import {
  useActiveDeviceQuery,
  useDeviceActivate,
  useDeviceConfigQuery,
  useDeviceMenuQuery,
  useDevicesQuery,
  useDeviceStatusQuery,
} from "devices/common/feature"
import { useApiDeviceRouter } from "devices/api-device/routes"
import { useEffect } from "react"
import { Navigate, Route, useLocation } from "react-router"
import {
  FullscreenLayout,
  registerMenuGroups,
  unregisterMenuGroups,
} from "app-routing/feature"
import {
  DeviceSwitchingLoader,
  DeviceTroubleshooting,
  WelcomeScreen,
} from "devices/common/ui"
import {
  DevicesPaths,
  DevicesQueryKeys,
  DeviceStatus,
} from "devices/common/models"
import { MenuIndex } from "app-routing/models"
import { NewsPaths } from "news/models"
import { useAppNavigate } from "app-routing/utils"
import { useHarmonyRouter } from "devices/harmony/routes"
import { DevicesSelectingPage } from "./devices-selecting-page"
import { usePureRouter } from "devices/pure/routes"
import { useQueryClient } from "@tanstack/react-query"
import { useHarmonyMscRouter } from "devices/harmony-msc/routes"
import { setContactSupportModalVisible } from "contact-support/feature"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { ApiConfig } from "devices/api-device/models"
import semver from "semver/preload"
import { AppSerialPort } from "app-serialport/renderer"

export const useDevicesInitRouter = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const navigate = useAppNavigate()
  const { pathname } = useLocation()

  const { data: devices = [] } = useDevicesQuery()
  const { data: activeDevice } = useActiveDeviceQuery()
  const activateDevice = useDeviceActivate()
  const { data: activeDeviceStatus } = useDeviceStatusQuery(activeDevice)
  const { data: menu } = useDeviceMenuQuery(activeDevice)
  const { data: config } = useDeviceConfigQuery(activeDevice)

  const apiDeviceRouter = useApiDeviceRouter(activeDevice)
  const harmonyRouter = useHarmonyRouter(activeDevice)
  const pureRouter = usePureRouter(activeDevice)
  const harmonyMscRouter = useHarmonyMscRouter(activeDevice)

  const handleWrapperClose = () => {
    if (devices.length > 1) {
      activateDevice(null)
    }
    navigate({ pathname: NewsPaths.Index })
  }

  const handleWelcomeClose = () => {
    navigate({ pathname: NewsPaths.Index })
  }

  const handleTroubleshoot = () => {
    navigate({ pathname: DevicesPaths.Troubleshooting })
  }

  const handleTryAgain = async () => {
    if (activeDevice) {
      // Reset only the active device
      AppSerialPort.reset(activeDevice.id)
      void queryClient.resetQueries({
        queryKey: [DevicesQueryKeys.All, activeDevice.id],
        exact: false,
      })
      void queryClient.resetQueries({
        queryKey: [DevicesQueryKeys.All, "active"],
        exact: true,
      })
    } else {
      // Reset all devices
      AppSerialPort.reset()
      void queryClient.resetQueries({
        queryKey: [DevicesQueryKeys.All],
        exact: false,
      })
    }

    navigate({ pathname: DevicesPaths.Connecting })
  }

  const handleContactSupport = () => {
    dispatch(setContactSupportModalVisible(true))
  }

  useEffect(() => {
    if (!pathname.startsWith("/device/")) {
      return
    }
    if (
      activeDeviceStatus !== DeviceStatus.Initialized &&
      activeDeviceStatus !== DeviceStatus.Initializing
    ) {
      navigate({ pathname: DevicesPaths.Connecting })
      return
    }
  }, [activeDeviceStatus, navigate, pathname])

  useEffect(() => {
    if (!pathname.startsWith(DevicesPaths.Index)) {
      return
    }

    void (async () => {
      if (
        [
          DevicesPaths.Connecting,
          DevicesPaths.Current,
          DevicesPaths.Troubleshooting,
        ].includes(pathname as DevicesPaths) &&
        devices.length === 0
      ) {
        navigate({ pathname: DevicesPaths.Welcome })
        return
      }
      if (pathname === DevicesPaths.Welcome && devices.length > 1) {
        navigate({ pathname: DevicesPaths.Selecting })
        return
      }
      if (pathname === DevicesPaths.Selecting && devices.length === 0) {
        navigate({ pathname: DevicesPaths.Welcome })
        return
      }
      if (
        pathname !== DevicesPaths.Connecting &&
        activeDeviceStatus === DeviceStatus.Initializing
      ) {
        navigate({ pathname: DevicesPaths.Connecting })
        return
      }

      if (
        pathname !== DevicesPaths.Troubleshooting &&
        activeDeviceStatus === DeviceStatus.CriticalError
      ) {
        navigate({ pathname: DevicesPaths.Troubleshooting })
        return
      }

      if (
        pathname !== DevicesPaths.Current &&
        (activeDeviceStatus === DeviceStatus.Initialized ||
          activeDeviceStatus === DeviceStatus.Locked ||
          activeDeviceStatus === DeviceStatus.Issue)
      ) {
        navigate({ pathname: DevicesPaths.Current })
        return
      }
    })()
  }, [activeDeviceStatus, devices.length, navigate, pathname])

  useEffect(() => {
    void (async () => {
      if (menu && activeDeviceStatus === DeviceStatus.Initialized) {
        dispatch(unregisterMenuGroups([MenuIndex.Device]))

        // Modify menu for API devices
        if (ApiDeviceSerialPort.isCompatible(activeDevice)) {
          const apiVersion =
            (config as ApiConfig | undefined)?.apiVersion || "1.0.0"

          const modifiedMenu = {
            ...menu,
            items: menu.items
              // Remove data migration tab
              ?.filter((item) => !item.path.endsWith("/mc-data-migration"))
              .map((item) => {
                if (item.path.endsWith("/mc-contacts")) {
                  // Remove duplicates tab for API version 1.0.0 and below
                  const subitems =
                    item.items?.filter((subitem) => {
                      return !(
                        subitem.path.endsWith("/mc-contacts-duplicates") &&
                        semver.lte(apiVersion, "1.0.0")
                      )
                    }) || []

                  if (subitems.length > 1) {
                    return {
                      ...item,
                      items: subitems,
                    }
                  }

                  return {
                    ...item,
                    items: undefined,
                    path: subitems[0]?.path || item.path,
                  }
                }
                return item
              }),
          }

          dispatch(registerMenuGroups([modifiedMenu]))
        } else {
          dispatch(registerMenuGroups([menu]))
        }
      } else {
        dispatch(unregisterMenuGroups([MenuIndex.Device]))
      }
    })()
  }, [activeDevice, activeDeviceStatus, config, dispatch, menu])

  return (
    <>
      <Route path={"/"} element={<Navigate to={DevicesPaths.Welcome} />} />
      <Route
        element={
          <FullscreenLayout
            onClose={
              [DevicesPaths.Connecting, DevicesPaths.Current].includes(
                pathname as DevicesPaths
              )
                ? undefined
                : handleWrapperClose
            }
          />
        }
      >
        <Route index element={<Navigate to={DevicesPaths.Welcome} />} />
        <Route
          path={DevicesPaths.Welcome}
          element={
            <WelcomeScreen
              onClose={handleWelcomeClose}
              onTroubleshoot={handleTroubleshoot}
            />
          }
        />
        <Route
          path={DevicesPaths.Selecting}
          element={<DevicesSelectingPage />}
        />
        <Route
          path={DevicesPaths.Connecting}
          element={<DeviceSwitchingLoader />}
        />
        <Route
          path={DevicesPaths.Troubleshooting}
          element={
            <DeviceTroubleshooting
              onTryAgain={handleTryAgain}
              onContactSupport={handleContactSupport}
            />
          }
        />
        <Route path={DevicesPaths.Current}>
          {apiDeviceRouter?.initialization}
          {harmonyRouter?.initialization}
          {pureRouter?.initialization}
          {harmonyMscRouter?.initialization}
        </Route>
      </Route>
      {apiDeviceRouter?.dashboard}
      {harmonyRouter?.dashboard}
      {pureRouter?.dashboard}
      {harmonyMscRouter?.dashboard}
    </>
  )
}
