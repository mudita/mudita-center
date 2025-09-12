/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import { HarmonyDirectory, Harmony } from "devices/harmony/models"
import { harmonyQueryKeys } from "./harmony-query-keys"
import { getHarmonyFileList } from "../api/get-harmony-file-list"
import { delayUntilAtLeast } from "app-utils/common"

const queryFn = async (directory: HarmonyDirectory, device?: Harmony) => {
  if (!device) {
    throw new Error("No device provided for useHarmonyFileListQuery")
  }

  const response = await getHarmonyFileList(directory, device)

  if (!response.ok) {
    throw response.status
  }

  return response.body
}

export const useHarmonyFileListQuery = (
  directory: HarmonyDirectory,
  device?: Harmony
) => {
  return useQuery({
    queryKey: useHarmonyFileListQuery.queryKey(`${device?.path}+${directory}`),
    enabled: !!device,
    queryFn: () => {
      return delayUntilAtLeast(() => queryFn(directory, device), 500)
    },
    select: (data) => data[directory] ?? [],
  })
}
useHarmonyFileListQuery.queryKey = harmonyQueryKeys.fileList
useHarmonyFileListQuery.queryFn = queryFn
