/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch } from "react-redux"
import {
  useActiveDevice,
  useDeviceActivate,
  useDeviceMenu,
  useDeviceMetadata,
  useDevices,
  useDeviceStatus,
} from "devices/common/feature"
import { useApiDeviceRouter } from "devices/api-device/routes"
import { FunctionComponent, useCallback, useEffect } from "react"
import { Navigate, Route, useLocation } from "react-router"
import {
  FullscreenLayout,
  registerMenuGroups,
  unregisterMenuGroups,
} from "app-routing/feature"
import {
  DevicesSelector,
  DevicesSelectorCard,
  DeviceSwitchingLoader,
  DeviceTroubleshooting,
  WelcomeScreen,
} from "devices/common/ui"
import {
  Device,
  DeviceMetadata,
  DevicesPaths,
  DeviceStatus,
} from "devices/common/models"
import { MenuIndex } from "app-routing/models"
import { NewsPaths } from "news/models"
import { useAppNavigate } from "app-routing/utils"

const DEFAULT_UX_DELAY = 500

export const useDevicesInitRouter = () => {
  const dispatch = useDispatch()
  const navigate = useAppNavigate()
  const { pathname } = useLocation()

  const { data: devices = [] } = useDevices()
  const { data: activeDevice } = useActiveDevice()
  const { data: activeDeviceStatus } = useDeviceStatus(
    activeDevice || undefined
  )
  const { data: menu } = useDeviceMenu(activeDevice || undefined)

  const apiDeviceRouter = useApiDeviceRouter(activeDevice || undefined)

  const onWrapperClose = () => {
    navigate({ pathname: NewsPaths.Index })
  }

  const onWelcomeClose = () => {
    navigate({ pathname: NewsPaths.Index })
  }

  const onTroubleshoot = () => {
    navigate({ pathname: DevicesPaths.Troubleshooting })
  }

  const delayForBetterUX = useCallback(
    (ms = DEFAULT_UX_DELAY) =>
      new Promise((resolve) => setTimeout(resolve, ms)),
    []
  )

  useEffect(() => {
    if (!pathname.startsWith(DevicesPaths.Index)) {
      return
    }

    void (async () => {
      if (pathname === DevicesPaths.Welcome && devices.length > 1) {
        await delayForBetterUX()
        navigate({ pathname: DevicesPaths.Selecting })
        return
      }
      if (pathname === DevicesPaths.Selecting) {
        return
      }
      if (
        pathname !== DevicesPaths.Connecting &&
        (activeDeviceStatus === DeviceStatus.Initializing ||
          activeDeviceStatus === DeviceStatus.Attached)
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
          activeDeviceStatus === DeviceStatus.Locked)
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
        await delayForBetterUX(DEFAULT_UX_DELAY - 100)
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
                : onWrapperClose
            }
          />
        }
      >
        <Route index element={<Navigate to={DevicesPaths.Welcome} />} />
        <Route
          path={DevicesPaths.Welcome}
          element={
            <WelcomeScreen
              onClose={onWelcomeClose}
              onTroubleshoot={onTroubleshoot}
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
          element={<DeviceTroubleshooting />}
        />
        <Route path={DevicesPaths.Current}>
          {apiDeviceRouter?.initialization}
        </Route>
      </Route>
      {apiDeviceRouter?.dashboard}
    </>
  )
}

export const DevicesSelectingPage: FunctionComponent = () => {
  const navigate = useAppNavigate()
  const { data: devices = [] } = useDevices()
  const activateDevice = useDeviceActivate()

  const selectDevice = useCallback(
    (deviceId: DeviceMetadata["id"]) => {
      const device = devices?.find((d) => d.path === deviceId)
      if (!device) {
        return
      }
      navigate({ pathname: DevicesPaths.Connecting })
      activateDevice(device)
    },
    [activateDevice, devices, navigate]
  )

  if (devices.length === 0) {
    return null
  }

  return (
    <DevicesSelector>
      {devices.map((device) => {
        const select = () => {
          selectDevice(device.path)
        }
        return <Card key={device.path} {...device} onClick={select} />
      })}
    </DevicesSelector>
  )
}

const Card: FunctionComponent<Device & { onClick: VoidFunction }> = ({
  onClick,
  ...device
}) => {
  const { data: metadata } = useDeviceMetadata(device)

  if (!metadata) {
    return null
  }
  return <DevicesSelectorCard {...metadata} onClick={onClick} />
}
