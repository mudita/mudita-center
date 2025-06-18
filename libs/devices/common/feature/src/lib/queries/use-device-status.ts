/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQueries, useQuery } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { useActiveDevice } from "./use-active-device"
import { Device, DeviceStatus } from "devices/common/models"

export const useDeviceStatus = (device?: Device) => {
  const { data: activeDevice } = useActiveDevice()
  const devicePath = device?.path || activeDevice?.path

  return useQuery<DeviceStatus | null>({
    queryKey: devicesQueryKeys.deviceStatus(devicePath),
    queryFn: () => null,
    enabled: Boolean(devicePath),
  })
}
useDeviceStatus.queryKey = devicesQueryKeys.deviceStatus

export const useDevicesStatuses = (devices: Device[]) => {
  const queries = useQueries({
    queries: devices.map((device) => ({
      queryKey: devicesQueryKeys.deviceStatus(device.path),
      queryFn: () => null,
    })),
  })
  return queries.map((query) => {
    return query.data as DeviceStatus | null
  })
}
