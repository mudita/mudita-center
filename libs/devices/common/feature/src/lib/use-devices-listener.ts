/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSerialPort } from "app-serialport/renderer"
import { useCallback, useLayoutEffect } from "react"
import {
  useActiveDevice,
  useDeviceActivate,
  useDeviceAttach,
  useDeviceDetach,
} from "./queries"
import { useLocation, useNavigate } from "react-router"
import { NewsPaths } from "news/models"
import { DevicesPaths } from "devices/common/models"
import { useAppDispatch } from "app-store/utils"
import { setDevicesDrawerVisibility } from "./store/devices.actions"
import { SerialPortChangedDevices } from "app-serialport/models"

export const useDevicesListener = () => {
  const dispatch = useAppDispatch()
  const attachDevice = useDeviceAttach()
  const detachDevice = useDeviceDetach()
  const activateDevice = useDeviceActivate()
  const { data: activeDevice } = useActiveDevice()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleAttach = useCallback(
    ({ added, all }: SerialPortChangedDevices) => {
      // If there are multiple devices connected and user is not on one of the device initialization pages,
      // open the drawer
      if (
        all.length > 1 &&
        activeDevice?.path !== added[0].path &&
        !pathname.startsWith(DevicesPaths.Index) &&
        pathname !== "/"
      ) {
        dispatch(setDevicesDrawerVisibility(true))
        return
      }
    },
    [activeDevice?.path, dispatch, pathname]
  )

  const handleDetach = useCallback(
    ({ removed, all }: SerialPortChangedDevices) => {
      // If active device is removed and user is on one of the device page
      if (
        pathname.startsWith("/device/") &&
        removed.some((device) => device.path === activeDevice?.path)
      ) {
        // If there are no devices left, navigate to the news page
        if (all.length === 0) {
          navigate({ pathname: NewsPaths.Index })
        }
        // or if there is one device left, navigate to the connecting page
        else if (all.length === 1) {
          navigate({ pathname: DevicesPaths.Connecting })
        }
        // or if there are multiple devices left, navigate to the selecting page
        else {
          navigate({ pathname: DevicesPaths.Selecting })
        }
      }

      // If the drawer is open and there is only one or no devices left,
      // close the drawer
      if (all.length <= 1) {
        dispatch(setDevicesDrawerVisibility(false))
      }
    },
    [activeDevice?.path, dispatch, navigate, pathname]
  )

  useLayoutEffect(() => {
    AppSerialPort.onDevicesChanged(async (devices) => {
      await Promise.all(
        devices.removed.map((device) => detachDevice(device.path))
      )
      await Promise.all(devices.added.map((device) => attachDevice(device)))

      if (devices.removed.length > 0) {
        handleDetach(devices)
      }

      // If there is a single device connected, activate it by default
      if (devices.all.length === 1) {
        activateDevice({
          path: devices.all[0].path,
          deviceType: devices.all[0].deviceType as never, // TODO: Fix type assertion
        })
      }

      // HANDLE DEVICE ADDITION
      if (devices.added.length > 0) {
        handleAttach(devices)
      }
    })
  }, [activateDevice, attachDevice, detachDevice, handleAttach, handleDetach])
}
