/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, EntityData } from "devices/api-device/models"
import {
  RefetchOptions,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query"
import { SerialPortDeviceId } from "app-serialport/models"
import { apiDeviceQueryKeys } from "./api-device-query-keys"
import { getEntities } from "../actions/get-entities/get-entities"
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react"
import { sum } from "lodash"
import { useApiEntitiesConfigQuery } from "./use-api-entities-config.query"
import { EventEmitter } from "events"

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
  const eventEmitterRef = useRef(new EventEmitter())

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
    retry: false,
  })

  const abort = useCallback(async () => {
    await queryClient.cancelQueries({
      queryKey: useApiEntitiesDataQuery.queryKey(entityType, device?.id),
    })
  }, [device?.id, entityType, queryClient])

  const refetch = useCallback(
    async ({
      onProgress,
      ...options
    }: { onProgress?: (p: number) => void } & RefetchOptions = {}) => {
      eventEmitterRef.current.on("progress", (p: number) => {
        onProgress?.(p)
      })
      await query.refetch(options)
      eventEmitterRef.current.removeAllListeners("progress")
    },
    [query]
  )

  useEffect(() => {
    eventEmitterRef.current.emit("progress", progress)
  }, [progress])

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
    refetch,
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
  const eventEmitterRef = useRef(new EventEmitter())

  const [progress, setProgress] = useState(0)
  const deferredProgress = useDeferredValue(progress)

  const reportProgress = useCallback(() => {
    if (entityTypes.length === 0) {
      setProgress(100)
      return
    }
    const currentValues = Object.values(progressRef.current)
    const totalProgress = Math.floor(sum(currentValues) / entityTypes.length)
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
    queries: entityTypes.map((entityType, index) => {
      return {
        queryKey: useApiEntitiesDataQuery.queryKey(entityType, device?.id),
        queryFn: async () => {
          if (index > 0) {
            await new Promise((resolve) => {
              eventEmitterRef.current.on(
                "queryFinished",
                (previousIndex: number) => {
                  if (previousIndex === index - 1) {
                    resolve(true)
                  }
                }
              )
            })
          }
          const result = await queryFn(
            entityType,
            device,
            makeProgressHandler(entityType)
          )
          eventEmitterRef.current.emit("queryFinished", index)
          if (index === entityTypes.length - 1) {
            // small delay to allow progress to reach 100%
            await new Promise((r) => setTimeout(r, 450))
            // clear event emitter listeners
            eventEmitterRef.current.removeAllListeners("queryFinished")
          }
          return result
        },
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
            options.onProgress?.(Math.floor(capped))
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
        progress: deferredProgress,
      }
    },
  })
}
