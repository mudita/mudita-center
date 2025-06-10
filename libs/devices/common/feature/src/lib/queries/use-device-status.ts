/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { DeviceStatus } from "devices/common/models"
import { Device } from "./use-devices"
import { useActiveDevice } from "./use-active-device"

export const useDeviceStatus = (device?: Device) => {
  const { data: activeDevice } = useActiveDevice()
  const devicePath = device?.path || activeDevice?.path

  return useQuery({
    queryKey: devicesQueryKeys.deviceStatus(devicePath),
    queryFn: () => {
      return DeviceStatus.Attached
    },
    initialData: DeviceStatus.Attached,
    enabled: Boolean(devicePath),
  })
}
useDeviceStatus.queryKey = devicesQueryKeys.deviceStatus
