/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HarmonyMsc } from "devices/harmony-msc/models"
import { getFlashStatus } from "../api/get-flash-status"

export interface waitForFlashCompletionOption {
  signal?: AbortSignal
}

export const waitForFlashCompletion = async (
  device: HarmonyMsc,
  options: waitForFlashCompletionOption = {}
): Promise<boolean> => {
  const { signal } = options

  if (signal && signal.aborted) {
    return false
  }

  console.log(`Checking flash status...`)

  const flashStatusResult = await getFlashStatus(device)

  console.log("Flash status result:", flashStatusResult)

  if (!flashStatusResult.ok) {
    return false
  }

  const flashStatus = flashStatusResult.data.body

  return flashStatus === "FLASH_STATUS_COMPLETED"
}
