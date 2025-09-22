/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation } from "@tanstack/react-query"
import { Harmony } from "devices/harmony/models"
import { deleteHarmonyFile } from "../api/delete-harmony-file"

const mutationFn = async (path: string, device?: Harmony) => {
  if (!device) {
    throw new Error("No device provided for useHarmonyDeleteFileMutation")
  }

  const response = await deleteHarmonyFile(path, device)

  if (response.ok) {
    return
  }

  throw response.status
}

export const useHarmonyDeleteFileMutation = (device?: Harmony) => {
  return useMutation({
    mutationFn: (path: string) => mutationFn(path, device),
  })
}

useHarmonyDeleteFileMutation.mutationFn = mutationFn
