/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, EntityData } from "devices/api-device/models"
import {
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query"
import { SerialPortDeviceId } from "app-serialport/models"
import { apiDeviceQueryKeys } from "./api-device-query-keys"
import { getEntities } from "../actions/get-entities/get-entities"
import { useCallback, useEffect, useRef, useState } from "react"
import { sum } from "lodash"
import { useApiEntitiesConfigQuery } from "./use-api-entities-config.query"

const queryFn = async (
  entityType?: string,
  device?: ApiDevice,
  onProgress?: (progress: number) => void,
  abortSignal?: AbortSignal
) => {
  if (!device) {
    throw new Error("Device is required to fetch entities data")
  }
  if (!entityType) {
    throw new Error("Entity type is required to fetch entities data")
  }

  const abortController = new AbortController()
  abortSignal?.addEventListener("abort", () => {
    abortController.abort()
  })

  return await getEntities({
    device,
    entitiesType: entityType,
    onProgress,
    abortController: abortController,
  })
}

export function useApiEntitiesDataQuery<R = EntityData[]>(
  entityType?: string,
  device?: ApiDevice,
  select?: (data: EntityData[]) => R
) {
  const queryClient = useQueryClient()
  const [progress, setProgress] = useState(0)
  const { isLoading, isError, isSuccess, isFetching, isPending } =
    useApiEntitiesConfigQuery(entityType, device)

  const query = useQuery({
    queryKey: useApiEntitiesDataQuery.queryKey(entityType, device?.id),
    queryFn: ({ signal }) => {
      return queryFn(entityType, device, setProgress, signal)
    },
    enabled: !!device && !!entityType,
    select,
  })

  const abort = useCallback(async () => {
    await queryClient.cancelQueries({
      queryKey: useApiEntitiesDataQuery.queryKey(entityType, device?.id),
    })
  }, [device?.id, entityType, queryClient])

  useEffect(() => {
    return () => {
      void abort()
    }
  }, [abort])

  return {
    ...query,
    isLoading: query.isLoading || isLoading,
    isError: query.isError || isError,
    isSuccess: query.isSuccess && isSuccess,
    isFetching: query.isFetching || isFetching || isPending,
    progress,
    abort,
  }
}

useApiEntitiesDataQuery.queryKey = (
  entityType?: string,
  id?: SerialPortDeviceId
) => {
  return apiDeviceQueryKeys.entitiesData(entityType, id)
}

export const useApiEntitiesDataMapQuery = (
  entityTypes: string[] = [],
  device?: ApiDevice,
  options?: Omit<UseQueryOptions, "queryFn" | "queryKey">
) => {
  const progressRef = useRef<Record<string, number>>({})
  const extraReporterRef = useRef<Record<string, (p: number) => void>>({})
  const [progress, setProgress] = useState(0)

  const reportProgress = useCallback(() => {
    if (entityTypes.length === 0) {
      setProgress(100)
      return
    }
    const currentValues = Object.values(progressRef.current)
    const totalProgress = Math.round(sum(currentValues) / entityTypes.length)
    setProgress(totalProgress)
  }, [entityTypes.length])

  const makeProgressHandler = useCallback(
    (entityType: string) => (entityProgress: number) => {
      progressRef.current[entityType] = entityProgress

      reportProgress()

      const extraReporter = extraReporterRef.current[entityType]
      extraReporter?.(entityProgress)
    },
    [reportProgress]
  )

  return useQueries({
    queries: entityTypes.map((entityType) => {
      return {
        queryKey: useApiEntitiesDataQuery.queryKey(entityType, device?.id),
        queryFn: () =>
          queryFn(entityType, device, makeProgressHandler(entityType)),
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

      const refetch = async (options?: {
        onProgress?: (p: number) => void
      }) => {
        if (!options?.onProgress) {
          for (const result of results) {
            await result?.refetch()
          }
          return
        }

        const total = entityTypes.length || 1

        entityTypes.forEach((entityType, index) => {
          extraReporterRef.current[entityType] = (entityProgress) => {
            const normalized = (index + entityProgress / 100) / total // 0..1
            const capped = Math.min(normalized * 99, 99) // max 99%

            options.onProgress?.(Math.round(capped))
          }
        })

        for (const result of results) {
          await result?.refetch()
        }

        entityTypes.forEach((entityType) => {
          delete extraReporterRef.current[entityType]
        })

        options.onProgress?.(100)
      }

      return {
        data,
        isLoading,
        isError,
        refetch,
        progress,
      }
    },
  })
}
