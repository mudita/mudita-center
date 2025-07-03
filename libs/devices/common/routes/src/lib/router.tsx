/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch } from "react-redux"
import {
  useActiveDevice,
  useDeviceActivate,
  useDeviceMenu,
  useDevices,
  useDeviceStatus,
} from "devices/common/feature"
import { useApiDeviceRouter } from "devices/api-device/routes"
import { useCallback, useEffect } from "react"
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
import { DevicesPaths, DeviceStatus } from "devices/common/models"
import { MenuIndex } from "app-routing/models"
import { NewsPaths } from "news/models"
import { useAppNavigate } from "app-routing/utils"
import { useHarmonyRouter } from "devices/harmony/routes"
import { DevicesSelectingPage } from "./devices-selecting-page"
import { usePureRouter } from "devices/pure/routes"
import { useQueryClient } from "@tanstack/react-query"
import { useHarmonyMscRouter } from "devices/harmony-msc/routes"
import { setContactSupportModalVisible } from "contact-support/feature"

const DEFAULT_UX_DELAY = 500

export const useDevicesInitRouter = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const navigate = useAppNavigate()
  const { pathname } = useLocation()

  const { data: devices = [] } = useDevices()
  const { data: activeDevice } = useActiveDevice()
  const activateDevice = useDeviceActivate()
  const { data: activeDeviceStatus } = useDeviceStatus(
    activeDevice || undefined
  )
  const { data: menu } = useDeviceMenu(activeDevice || undefined)

  const apiDeviceRouter = useApiDeviceRouter(activeDevice || undefined)
  const harmonyRouter = useHarmonyRouter(activeDevice || undefined)
  const pureRouter = usePureRouter(activeDevice || undefined)
  const harmonyMscRouter = useHarmonyMscRouter(activeDevice || undefined)

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

  const handleTryAgain = () => {
    if (!activeDevice) {
      return
    }
    void queryClient.invalidateQueries({
      queryKey: ["devices", activeDevice?.path],
    })
  }

  const handleContactSupport = () => {
    dispatch(setContactSupportModalVisible(true))
  }

  const delayForBetterUX = useCallback(
    (ms = DEFAULT_UX_DELAY) =>
      new Promise((resolve) => setTimeout(resolve, ms)),
    []
  )

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
        await delayForBetterUX()
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
        await delayForBetterUX()
        navigate({ pathname: DevicesPaths.Connecting })
        return
      }

      if (
        pathname !== DevicesPaths.Troubleshooting &&
        activeDeviceStatus === DeviceStatus.CriticalError
      ) {
        await delayForBetterUX()
        navigate({ pathname: DevicesPaths.Troubleshooting })
        return
      }

      if (
        pathname !== DevicesPaths.Current &&
        (activeDeviceStatus === DeviceStatus.Initialized ||
          activeDeviceStatus === DeviceStatus.Locked ||
          activeDeviceStatus === DeviceStatus.Issue)
      ) {
        await delayForBetterUX()
        navigate({ pathname: DevicesPaths.Current })
        return
      }
    })()
  }, [activeDeviceStatus, delayForBetterUX, devices.length, navigate, pathname])

  useEffect(() => {
    void (async () => {
      if (menu && activeDeviceStatus === DeviceStatus.Initialized) {
        await delayForBetterUX(DEFAULT_UX_DELAY / 2)
        dispatch(unregisterMenuGroups([MenuIndex.Device]))
        dispatch(registerMenuGroups([menu]))
      } else {
        dispatch(unregisterMenuGroups([MenuIndex.Device]))
      }
    })()
  }, [activeDevice, activeDeviceStatus, delayForBetterUX, dispatch, menu])

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
