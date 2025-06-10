/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "./use-devices"
import { useQuery } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { getMenuConfig } from "devices/api-device/feature"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { ApiDeviceErrorType } from "devices/api-device/models"
import { MenuGroup } from "app-routing/models"

const queryFn = async (device?: Device) => {
  if (ApiDeviceSerialPort.isCompatible(device)) {
    const menu = await getMenuConfig(device)
    if (menu.ok) {
      return menu.body
    } else if (menu.status === ApiDeviceErrorType.DeviceLocked) {
      throw ApiDeviceErrorType.DeviceLocked
    } else {
      throw menu.status
    }
  }
  return null
}

export const useDeviceMenu = <ErrorType = Error>(device?: Device) => {
  return useQuery<MenuGroup | null, ErrorType>({
    queryKey: devicesQueryKeys.deviceMenu(device?.path),
    queryFn: () => queryFn(device),
    retry: ApiDeviceSerialPort.isCompatible(device)
      ? (failureCount, error) => {
          return error === ApiDeviceErrorType.DeviceLocked || failureCount < 3
        }
      : 3,
    retryDelay: 250,
    enabled: Boolean(device),
  })
}
useDeviceMenu.queryKey = devicesQueryKeys.deviceMenu
