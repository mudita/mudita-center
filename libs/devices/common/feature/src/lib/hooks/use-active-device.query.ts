/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { Device } from "devices/common/models"
import { useCallback, useEffect } from "react"
import type { DefaultError } from "@tanstack/query-core"
import { useDeviceConfigQuery } from "./use-device-config.query"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

export const useActiveDeviceQuery = <D extends Device = Device>() => {
  const queryClient = useQueryClient()

  const query = useQuery<D | null, DefaultError, D | undefined>({
    queryKey: useActiveDeviceQuery.queryKey,
    queryFn: () => null,
    select: (device) => {
      if (!device) {
        return undefined
      }
      return device
    },
  })

  const { data: config } = useDeviceConfigQuery<D>(query.data)

  useEffect(() => {
    if (ApiDeviceSerialPort.isCompatible(query.data)) {
      queryClient.setQueryData(
        useActiveDeviceQuery.queryKey,
        (device: D | null) => {
          if (!device) {
            return null
          }
          return {
            ...device,
            realSerialNumber: config?.serialNumber || device.serialNumber,
          } as D
        }
      )
    }
  }, [config, query.data, queryClient])

  return query
}
useActiveDeviceQuery.queryKey = devicesQueryKeys.activeDevice()

export const useDeviceActivate = () => {
  const queryClient = useQueryClient()

  return useCallback(
    (device: Device | null) => {
      queryClient.setQueryData(useActiveDeviceQuery.queryKey, device)
    },
    [queryClient]
  )
}

export const getActiveDevice = (
  queryClient: ReturnType<typeof useQueryClient>
) => {
  return (
    queryClient.getQueryData<Device | null>(useActiveDeviceQuery.queryKey) ||
    null
  )
}
