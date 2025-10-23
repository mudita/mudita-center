/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  EntitiesJsonData,
  EntityData,
} from "devices/api-device/models"
import { useQueries, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { SerialPortDeviceId } from "app-serialport/models"
import { getEntitiesData } from "../api/get-entities-data"
import { apiDeviceQueryKeys } from "./api-device-query-keys"

const queryFn = async (entityType: string, device?: ApiDevice) => {
  if (!device) {
    throw new Error("Device is required to fetch entities data")
  }
  const data = await getEntitiesData(device, { entityType })
  return (data.body as EntitiesJsonData).data ?? []
}

export function useApiEntitiesDataQuery(type: string, device?: ApiDevice) {
  return useQuery({
    queryKey: useApiEntitiesDataQuery.queryKey(type, device?.id),
    queryFn: () => queryFn(type, device),
    enabled: !!device,
  })
}

useApiEntitiesDataQuery.queryKey = (
  feature: string,
  id?: SerialPortDeviceId
) => {
  return apiDeviceQueryKeys.entitiesData(feature, id)
}

export const useApiEntitiesDataMapQuery = (
  entityTypes: string[] = [],
  device?: ApiDevice,
  options?: Omit<UseQueryOptions, "queryFn" | "queryKey">
) => {
  return useQueries({
    queries: entityTypes.map((entityType) => {
      return {
        queryKey: useApiEntitiesDataQuery.queryKey(entityType, device?.id),
        queryFn: () => queryFn(entityType, device),
        enabled: !!device,
        ...options,
      }
    }),
    combine: (results) => {
      const isLoading = results.some((r) => r.isLoading)
      const isError = results.some((r) => r.isError)

      const data = Object.fromEntries(
        entityTypes.map((entityType, i) => [entityType, results[i]?.data ?? []])
      ) as Record<string, EntityData[]>

      const refetch = () => results.forEach((r) => r.refetch?.())

      return {
        data,
        isLoading,
        isError,
        refetch,
      }
    },
  })
}
