/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { AppSerialPort } from "app-serialport/renderer"
import { useCallback } from "react"
import { SerialPortDeviceInfo } from "app-serialport/models"
import { uniqBy } from "lodash"
import { useActiveDevice } from "./use-active-device"

export type Device = {
  path: SerialPortDeviceInfo["path"]
  deviceType: SerialPortDeviceInfo["deviceType"]
}

const queryFn = async () => {
  const devices = await AppSerialPort.getCurrentDevices()

  return devices.map(({ path, deviceType }) => ({
    path,
    deviceType,
  }))
}

export const useDevices = ({ enabled } = { enabled: true }) => {
  return useQuery<Device[]>({
    queryKey: devicesQueryKeys.all,
    queryFn,
    enabled,
  })
}
useDevices.queryKey = devicesQueryKeys.all

export const useDeviceAttach = () => {
  const queryClient = useQueryClient()

  return useCallback(
    async (device: SerialPortDeviceInfo) => {
      queryClient.setQueryData(
        useDevices.queryKey,
        (previousDevices: SerialPortDeviceInfo[] = []) => {
          return uniqBy(
            [
              ...previousDevices,
              { path: device.path, deviceType: device.deviceType },
            ],
            "path"
          )
        }
      )
    },
    [queryClient]
  )
}

export const useDeviceDetach = () => {
  const queryClient = useQueryClient()
  const { data: activeDevice } = useActiveDevice()

  return useCallback(
    (path: SerialPortDeviceInfo["path"]) => {
      queryClient.setQueryData(
        useDevices.queryKey,
        (previousDevices: SerialPortDeviceInfo[] = []) => {
          return previousDevices.filter((device) => device.path !== path)
        }
      )
      queryClient.removeQueries({ queryKey: devicesQueryKeys._device(path) })
      if (activeDevice?.path === path) {
        queryClient.removeQueries({
          queryKey: devicesQueryKeys.activeDevice(),
        })
      }
    },
    [activeDevice, queryClient]
  )
}
