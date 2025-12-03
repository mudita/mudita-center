/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError, AppResult, AppResultFactory } from "app-utils/models"
import { delay } from "app-utils/common"
import {
  HarmonyMscProcessErrorName,
  HarmonyMscProcessState,
} from "devices/harmony-msc/models"

interface flashHarmonyMscArgs {
  abortController: AbortController
  onProgress?: (progress: {
    state: HarmonyMscProcessState
    progress?: number
  }) => void
}

const DELAY_MS = 1000

export const flashHarmonyMsc = async ({
  abortController,
  onProgress,
}: flashHarmonyMscArgs): Promise<AppResult> => {
  return await mockFlashHarmonyMscOnMacosPlatform({
    abortController,
    onProgress,
  })
}

const mockFlashHarmonyMscOnMacosPlatform = async ({
  abortController,
  onProgress,
}: flashHarmonyMscArgs): Promise<AppResult> => {
  if (abortController.signal.aborted) {
    return AppResultFactory.failed(
      new AppError("Aborted", HarmonyMscProcessErrorName.Aborted)
    )
  }
  onProgress?.({
    state: HarmonyMscProcessState.GettingFilesDetails,
    progress: 0,
  })
  await delay(100)
  if (abortController.signal.aborted) {
    return AppResultFactory.failed(
      new AppError("Aborted", HarmonyMscProcessErrorName.Aborted)
    )
  }
  onProgress?.({
    state: HarmonyMscProcessState.GettingFilesDetails,
    progress: 12,
  })
  await delay(DELAY_MS)
  if (abortController.signal.aborted) {
    return AppResultFactory.failed(
      new AppError("Aborted", HarmonyMscProcessErrorName.Aborted)
    )
  }
  onProgress?.({ state: HarmonyMscProcessState.DownloadingFiles, progress: 37 })
  await delay(DELAY_MS)
  if (abortController.signal.aborted) {
    return AppResultFactory.failed(
      new AppError("Aborted", HarmonyMscProcessErrorName.Aborted)
    )
  }
  onProgress?.({ state: HarmonyMscProcessState.UnpackingFiles, progress: 62 })
  await delay(DELAY_MS)
  if (abortController.signal.aborted) {
    return AppResultFactory.failed(
      new AppError("Aborted", HarmonyMscProcessErrorName.Aborted)
    )
  }
  onProgress?.({ state: HarmonyMscProcessState.FlashingProcess, progress: 87 })

  await delay(DELAY_MS)
  if (abortController.signal.aborted) {
    return AppResultFactory.failed(
      new AppError("Aborted", HarmonyMscProcessErrorName.Aborted)
    )
  }
  onProgress?.({ state: HarmonyMscProcessState.FlashingProcess, progress: 100 })
  onProgress?.({ state: HarmonyMscProcessState.SetupTerminal })
  await delay(DELAY_MS)
  if (abortController.signal.aborted) {
    return AppResultFactory.failed(
      new AppError("Aborted", HarmonyMscProcessErrorName.Aborted)
    )
  }
  onProgress?.({ state: HarmonyMscProcessState.Restarting })
  await delay(DELAY_MS)
  if (abortController.signal.aborted) {
    return AppResultFactory.failed(
      new AppError("Aborted", HarmonyMscProcessErrorName.Aborted)
    )
  }
  onProgress?.({ state: HarmonyMscProcessState.Complete })

  return AppResultFactory.success()
}
