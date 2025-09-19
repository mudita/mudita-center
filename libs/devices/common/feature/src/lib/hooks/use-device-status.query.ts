/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQueries, useQuery } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { useActiveDeviceQuery } from "./use-active-device.query"
import { Device, DeviceStatus } from "devices/common/models"
import { DefaultError } from "@tanstack/query-core"

export const useDeviceStatusQuery = <D extends Device = Device>(device?: D) => {
  const { data: activeDevice } = useActiveDeviceQuery<D>()
  const devicePath = device?.id || activeDevice?.id

  return useQuery<DeviceStatus | null, DefaultError, DeviceStatus | undefined>({
    queryKey: useDeviceStatusQuery.queryKey(devicePath),
    queryFn: () => null,
    enabled: Boolean(devicePath),
    select: (status) => {
      if (!status) {
        return undefined
      }
      return status
    },
  })
}
useDeviceStatusQuery.queryKey = devicesQueryKeys.deviceStatus

export const useDevicesStatuses = (devices: Device[]) => {
  const queries = useQueries({
    queries: devices.map((device) => ({
      queryKey: devicesQueryKeys.deviceStatus(device.id),
      queryFn: () => null,
    })),
  })
  return queries.map((query) => {
    return query.data as DeviceStatus | null
  })
}
