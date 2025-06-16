/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { Device } from "devices/common/models"
import { useCallback } from "react"

export const useActiveDevice = () => {
  return useQuery<Device | null>({
    queryKey: devicesQueryKeys.activeDevice(),
    queryFn: () => null,
  })
}
useActiveDevice.queryKey = devicesQueryKeys.activeDevice()

export const useDeviceActivate = () => {
  const queryClient = useQueryClient()

  return useCallback(
    (device: Device) => {
      queryClient.setQueryData(useActiveDevice.queryKey, device)
    },
    [queryClient]
  )
}

export const getActiveDevice = (
  queryClient: ReturnType<typeof useQueryClient>
) => {
  return (
    queryClient.getQueryData<Device | null>(useActiveDevice.queryKey) || null
  )
}
