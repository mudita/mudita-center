/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { getApiConfig } from "devices/api-device/feature"
import { useQuery } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { Device } from "./use-devices"

const queryFn = async (device?: Device) => {
  if (!device) {
    return null
  }
  if (ApiDeviceSerialPort.isCompatible(device)) {
    const config = await getApiConfig(device)
    if (config.ok) {
      return config.body
    } else {
      throw config.status
    }
  }
  return null
}

export const useDeviceConfig = (device?: Device) => {
  return useQuery({
    queryKey: devicesQueryKeys.deviceConfig(device?.path),
    queryFn: () => queryFn(device),
    retry: 3,
    retryDelay: 250,
    enabled: Boolean(device),
  })
}
useDeviceConfig.queryKey = devicesQueryKeys.deviceConfig
useDeviceConfig.queryFn = queryFn
