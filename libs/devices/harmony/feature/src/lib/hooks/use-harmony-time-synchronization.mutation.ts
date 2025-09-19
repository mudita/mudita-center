/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Harmony } from "devices/harmony/models"
import { synchronizeHarmonyTime } from "../api/synchronize-harmony-time"
import { useHarmonyTimeQuery } from "./use-harmony-time.query"
import { useCallback, useEffect, useRef } from "react"
import { delayUntil } from "app-utils/common"

const mutationFn = async (device?: Harmony) => {
  if (!device) {
    throw new Error(
      "No device provided for useHarmonyTimeSynchronizationMutation"
    )
  }
  const response = await delayUntil(synchronizeHarmonyTime(device), 1000)
  if (response.ok) {
    return
  }
  throw response.status
}

export const useHarmonyTimeSynchronizationMutation = (device?: Harmony) => {
  const queryClient = useQueryClient()
  const timeoutRef = useRef<NodeJS.Timeout>(undefined)

  const mutation = useMutation({
    mutationFn: () => mutationFn(device),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: useHarmonyTimeQuery.queryKey(device?.id),
      })
    },
    retry: 3,
    retryDelay: 250,
  })

  const isSuccess = mutation.isSuccess

  const resetMutation = useCallback(() => {
    mutation.reset()
  }, [mutation])

  useEffect(() => {
    clearTimeout(timeoutRef.current)

    if (isSuccess) {
      timeoutRef.current = setTimeout(() => {
        resetMutation()
      }, 3000)
    }

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [isSuccess, resetMutation])

  return mutation
}
useHarmonyTimeSynchronizationMutation.mutationFn = mutationFn
