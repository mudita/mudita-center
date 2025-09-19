/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import { harmonyQueryKeys } from "./harmony-query-keys"
import { Harmony, HarmonyErrorType } from "devices/harmony/models"
import { getHarmonyTime } from "../api/get-harmony-time"
import { DeviceErrorType } from "devices/common/models"

const queryFn = async (device?: Harmony) => {
  if (!device) {
    throw new Error("No device provided for useHarmonyTimeQuery")
  }
  const response = await getHarmonyTime(device)
  if (response.ok) {
    return response.body.timestamp
  }
  throw response.status
}

type QueryFnResult = Awaited<ReturnType<typeof queryFn>>

type UseHarmonyTimeQueryResult =
  | {
      timestamp: number
      formattedTime: string
      formattedDate: string
    }
  | undefined

export const useHarmonyTimeQuery = (device?: Harmony) => {
  return useQuery<
    QueryFnResult,
    DeviceErrorType | HarmonyErrorType,
    UseHarmonyTimeQueryResult
  >({
    queryKey: useHarmonyTimeQuery.queryKey(device?.id),
    enabled: !!device,
    queryFn: () => queryFn(device),
    select: (timestamp) => {
      if (!timestamp) {
        return undefined
      }
      const formattedTime = Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(timestamp)

      const formattedDate = Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(timestamp)

      return {
        timestamp: timestamp,
        formattedTime: formattedTime,
        formattedDate: formattedDate,
      }
    },
    refetchInterval: (query) => {
      if (query.state.error === HarmonyErrorType.NotFound) {
        return false
      }
      const deviceTime = query.state.data
      if (deviceTime) {
        const deviceSeconds = new Date(deviceTime).getSeconds()
        const timeLeft = Math.max(1, 60 - deviceSeconds) + 1
        return timeLeft * 1_000
      }
      return 60_000
    },
    refetchIntervalInBackground: true,
    retry: 3,
    retryDelay: 250,
  })
}
useHarmonyTimeQuery.queryKey = harmonyQueryKeys.time
useHarmonyTimeQuery.queryFn = queryFn
