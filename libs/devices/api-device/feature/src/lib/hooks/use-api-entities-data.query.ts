/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, EntityData } from "devices/api-device/models"
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import { SerialPortDeviceId } from "app-serialport/models"
import { apiDeviceQueryKeys } from "./api-device-query-keys"
import { getEntities } from "../actions/get-entities/get-entities"
import { useCallback, useEffect, useRef, useState } from "react"
import { sum } from "lodash"
import { useApiEntitiesConfigQuery } from "./use-api-entities-config.query"
import PQueue from "p-queue"

const queryFn = async <D = EntityData[]>(
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

  return (await getEntities({
    device,
    entitiesType: entityType,
    onProgress,
    abortController: abortController,
  })) as D
}

export const useApiEntitiesDataQuery = <D = EntityData[], R = D>(
  entityType?: string,
  device?: ApiDevice,
  select?: (data: D) => R
) => {
  const queryClient = useQueryClient()

  const [progress, setProgress] = useState(0)
  const { isLoading, isError, isSuccess, isFetching, isPending } =
    useApiEntitiesConfigQuery(entityType, device)

  const query = useQuery({
    queryKey: useApiEntitiesDataQuery.queryKey(entityType, device?.id),
    queryFn: ({ signal }) => {
      return queryFn<D>(entityType, device, setProgress, signal)
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
useApiEntitiesDataQuery.queryFn = queryFn

export const useApiEntitiesDataQueries = <
  D extends EntityData[] = EntityData[],
  R = D,
  E extends string = string,
>(
  entityTypes: E[] = [],
  device?: ApiDevice,
  select?: (data: D) => R
) => {
  const queryClient = useQueryClient()

  const queueRef = useRef(new PQueue({ concurrency: 1, interval: 50 }))
  const abortRef = useRef(new AbortController())
  const progressRef = useRef(
    Object.fromEntries(entityTypes.map((type) => [type, 0]))
  )

  const [progress, setProgress] = useState(0)

  const reset = useCallback(() => {
    progressRef.current = Object.fromEntries(
      entityTypes.map((type) => [type, 0])
    )
    setProgress(0)
    abortRef.current = new AbortController()
    queueRef.current.clear()
  }, [entityTypes])

  const queries = useQueries({
    queries: entityTypes.map((entityType) => ({
      queryKey: useApiEntitiesDataQuery.queryKey(entityType, device?.id),
      queryFn: () => {
        return queueRef.current.add(() => {
          return useApiEntitiesDataQuery.queryFn<D>(
            entityType,
            device,
            (progress) => {
              progressRef.current[entityType] = progress

              setProgress(
                Math.floor(
                  sum(Object.values(progressRef.current)) / entityTypes.length
                )
              )
            },
            abortRef.current.signal
          )
        })
      },
      enabled: true,
      select,
    })),
    combine: (results) => {
      const isLoading = results.some((r) => r.isLoading)
      const isError = results.some((r) => r.isError)
      const isSuccess = results.every((r) => r.isSuccess)

      const data = Object.fromEntries(
        entityTypes.map((entityType, i) => [entityType, results[i]?.data])
      ) as Record<E, R>

      return {
        data,
        isLoading,
        isError,
        isSuccess,
      }
    },
  })

  const refetch = useCallback(async () => {
    reset()

    await queryClient.refetchQueries({
      queryKey: apiDeviceQueryKeys.entitiesData("", device?.id).slice(0, -1),
    })
  }, [device?.id, queryClient, reset])

  const abort = () => abortRef.current.abort()

  return {
    ...queries,
    abort,
    progress,
    refetch,
  }
}
