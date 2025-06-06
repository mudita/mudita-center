/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { Device, useDevices } from "./use-devices"
import { useCallback } from "react"

export const useActiveDevice = () => {
  return useQuery<Device | null>({
    queryKey: devicesQueryKeys.activeDevice(),
    queryFn: () => {
      return null
    },
  })
}
useActiveDevice.queryKey = devicesQueryKeys.activeDevice()

export const useFakeActiveDevice = () => {
  const { data: activeDevice } = useActiveDevice()
  const { data: devices = [] } = useDevices()

  return activeDevice || (devices.length === 1 ? devices[0] : undefined)
}

export const useDeviceActivate = () => {
  const queryClient = useQueryClient()

  return useCallback(
    (device: Device) => {
      if (!device) {
        return
      }
      queryClient.setQueryData(useActiveDevice.queryKey, device)
    },
    [queryClient]
  )
}
