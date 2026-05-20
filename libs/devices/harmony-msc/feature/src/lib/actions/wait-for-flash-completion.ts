/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HarmonyMsc } from "devices/harmony-msc/models"
import { delay } from "app-utils/common"
import { getFlashStatus } from "../api/get-flash-status"

export interface waitForFlashCompletionOption {
  intervalAttemptsLeft?: number
  intervalTime?: number
  signal?: AbortSignal
}

export const waitForFlashCompletion = async (
  device: HarmonyMsc,
  options: waitForFlashCompletionOption = {}
): Promise<boolean> => {
  const { intervalAttemptsLeft = 300, intervalTime = 1000, signal } = options

  if (intervalAttemptsLeft <= 0 || signal?.aborted) {
    return false
  }

  console.log(`Checking flash status, attempts left: ${intervalAttemptsLeft}`)

  const flashStatusResult = await getFlashStatus(device)
  if (!flashStatusResult.ok) {
    return false
  }

  const flashStatus = flashStatusResult.data.body

  console.log(`Flash status: ${flashStatus}`)

  if (flashStatus === "FLASH_STATUS_COMPLETED") {
    return true
  } else if (flashStatus === "FLASH_STATUS_FAILED") {
    return false
  }

  await delay(intervalTime)

  return waitForFlashCompletion(device, {
    intervalAttemptsLeft: intervalAttemptsLeft - 1,
    intervalTime,
    signal,
  })
}
