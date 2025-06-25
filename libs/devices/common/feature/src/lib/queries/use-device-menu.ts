/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "devices/common/models"
import { useQuery } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { getApiMenuConfig } from "devices/api-device/feature"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { ApiDeviceErrorType } from "devices/api-device/models"
import { MenuGroup } from "app-routing/models"
import { HarmonySerialPort } from "devices/harmony/adapters"
import { getHarmonyMenu } from "devices/harmony/feature"
import { PureSerialPort } from "devices/pure/adapters"
import { getPureMenu } from "devices/pure/feature"
import { HarmonyMscSerialPort } from "devices/harmony-msc/adapters"
import { getHarmonyMscMenu } from "devices/harmony-msc/feature"

const queryFn = async (device?: Device): Promise<MenuGroup | null> => {
  if (!device) {
    return null
  }
  if (ApiDeviceSerialPort.isCompatible(device)) {
    const menu = await getApiMenuConfig(device)
    if (menu.ok) {
      return menu.body
    } else if (menu.status === ApiDeviceErrorType.DeviceLocked) {
      throw ApiDeviceErrorType.DeviceLocked
    } else {
      throw menu.status
    }
  }
  if (HarmonySerialPort.isCompatible(device)) {
    return getHarmonyMenu()
  }
  if (PureSerialPort.isCompatible(device)) {
    return getPureMenu()
  }
  if (HarmonyMscSerialPort.isCompatible(device)) {
    return getHarmonyMscMenu()
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
    retryDelay: 500,
    enabled: Boolean(device),
  })
}
useDeviceMenu.queryKey = devicesQueryKeys.deviceMenu
useDeviceMenu.queryFn = queryFn
