/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import {
  Harmony,
  HarmonyDirectory,
  HarmonyGetFileListResponse,
} from "devices/harmony/models"
import { delayUntilAtLeast } from "app-utils/common"
import { getHarmonyFileList } from "../api/get-harmony-file-list"
import { harmonyQueryKeys } from "./harmony-query-keys"

const queryFn = async (directory: HarmonyDirectory, device?: Harmony) => {
  if (!device) {
    throw new Error("No device provided for useHarmonyFileListQuery")
  }

  const response = await getHarmonyFileList(directory, device)

  if (!response.ok) {
    throw response.status
  }

  return response.body as HarmonyGetFileListResponse
}

export const useHarmonyFileListQuery = (
  directory: HarmonyDirectory,
  device?: Harmony
) => {
  return useQuery({
    queryKey: useHarmonyFileListQuery.queryKey(directory, device?.path),
    enabled: !!device,
    queryFn: () => {
      return delayUntilAtLeast(() => queryFn(directory, device), 250)
    },
    select: (data) => data[directory] ?? [],
  })
}
useHarmonyFileListQuery.queryKey = harmonyQueryKeys.fileList
useHarmonyFileListQuery.queryFn = queryFn
