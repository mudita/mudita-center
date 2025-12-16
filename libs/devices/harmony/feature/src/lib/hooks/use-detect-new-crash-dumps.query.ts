/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import { Harmony } from "devices/harmony/models"
import { detectNewCrashDumps } from "../actions/detect-new-crash-dumps"
import { harmonyQueryKeys } from "./harmony-query-keys"

const queryFn = async (device?: Harmony) => {
  if (!device) {
    throw new Error("No device provided for useDetectNewCrashDumpsQuery")
  }

  const result = await detectNewCrashDumps(device)

  if (!result.ok) {
    throw result.error
  }

  return result.data
}

export const useDetectNewCrashDumpsQuery = (device?: Harmony) => {
  return useQuery({
    queryKey: useDetectNewCrashDumpsQuery.queryKey(device?.path),
    enabled: !!device,
    queryFn: () => queryFn(device),
  })
}

useDetectNewCrashDumpsQuery.queryKey = harmonyQueryKeys.detectNewCrashDumps
useDetectNewCrashDumpsQuery.queryFn = queryFn
