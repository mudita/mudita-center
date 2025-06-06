/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch } from "react-redux"
import {
  Device,
  useActiveDevice,
  useDeviceActivate,
  useDeviceMenu,
  useDeviceMetadata,
  useDevices,
  useDeviceStatus,
  useFakeActiveDevice,
} from "devices/common/feature"
import { useApiDeviceRouter } from "devices/api-device/routes"
import { FunctionComponent, useCallback, useEffect } from "react"
import { Navigate, Route, useLocation, useNavigate } from "react-router"
import {
  FullscreenModalLayout,
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
  DeviceMetadata,
  DevicesPaths,
  DeviceStatus,
} from "devices/common/models"
import { MenuIndex } from "app-routing/models"
import { useQueryClient } from "@tanstack/react-query"
import { NewsPaths } from "news/models"

export const useDevicesInitRouter = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const activateDevice = useDeviceActivate()

  const { data: devices = [] } = useDevices()
  const { data: activeDevice } = useActiveDevice()
  const fakeActiveDevice = useFakeActiveDevice()
  const apiDeviceRouter = useApiDeviceRouter(fakeActiveDevice)

  const { data: activeDeviceStatus } = useDeviceStatus()
  const { data: menu } = useDeviceMenu(fakeActiveDevice)
  const { data: activeDeviceMetadata } = useDeviceMetadata(fakeActiveDevice)

  const onWrapperClose = () => {
    navigate({ pathname: NewsPaths.Index })
  }

  const onWelcomeClose = () => {
    navigate({ pathname: NewsPaths.Index })
  }

  const onTroubleshoot = () => {
    navigate({ pathname: DevicesPaths.Troubleshooting })
  }

  useEffect(() => {
    if (!pathname.startsWith(DevicesPaths.Index) && fakeActiveDevice) {
      if (!activeDeviceMetadata?.locked) {
        activateDevice(fakeActiveDevice)
      }
    }
  }, [activateDevice, fakeActiveDevice, activeDeviceMetadata?.locked, pathname])

  useEffect(() => {
    if (!pathname.startsWith(DevicesPaths.Index)) {
      return
    }
    if (!queryClient.getQueryData(useActiveDevice.queryKey)) {
      if (devices.length > 1) {
        navigate({ pathname: DevicesPaths.Selecting })
      } else if (devices.length === 1) {
        activateDevice(devices[0])
      }
    }
  }, [activateDevice, devices, navigate, pathname, queryClient])

  useEffect(() => {
    if (!pathname.startsWith(DevicesPaths.Index)) {
      return
    }

    if (pathname === DevicesPaths.Selecting) {
      navigate({ pathname: DevicesPaths.Connecting })
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
      pathname !== DevicesPaths.Current &&
      activeDeviceStatus === DeviceStatus.Initialized
    ) {
      navigate({ pathname: DevicesPaths.Current })
      return
    }

    if (
      pathname !== DevicesPaths.Troubleshooting &&
      activeDeviceStatus === DeviceStatus.CriticalError
    ) {
      navigate({ pathname: DevicesPaths.Troubleshooting })
      return
    }
  }, [activeDeviceStatus, navigate, pathname])

  useEffect(() => {
    if (menu) {
      dispatch(registerMenuGroups([menu]))
    } else {
      dispatch(unregisterMenuGroups([MenuIndex.Device]))
    }
  }, [dispatch, menu])

  return (
    <>
      <Route path={"/"} element={<Navigate to={DevicesPaths.Welcome} />} />
      <Route
        element={
          <FullscreenModalLayout
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
        {activeDevice ? (
          <Route path={DevicesPaths.Current}>
            {apiDeviceRouter?.initialization}
          </Route>
        ) : (
          <Route index element={<Navigate to={NewsPaths.Index} replace />} />
        )}
      </Route>
      {apiDeviceRouter?.dashboard}
    </>
  )
}

export const DevicesSelectingPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { data: devices = [] } = useDevices()
  const activateDevice = useDeviceActivate()

  const selectDevice = useCallback(
    (deviceId: DeviceMetadata["id"]) => {
      const device = devices?.find((d) => d.path === deviceId)
      if (!device) {
        return
      }
      activateDevice(device)
      navigate({ pathname: DevicesPaths.Current })
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
