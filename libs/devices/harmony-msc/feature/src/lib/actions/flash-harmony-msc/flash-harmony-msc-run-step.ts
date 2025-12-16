/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  HarmonyMscProcessErrorName,
  HarmonyMscProcessProgress,
} from "devices/harmony-msc/models"
import { AppError, AppResult, AppResultFactory } from "app-utils/models"
import { flashHarmonyMscParams } from "./flash-harmony-msc.types"

interface FlashHarmonyMscRunStepOptions<Data>
  extends HarmonyMscProcessProgress,
    flashHarmonyMscParams {
  task: () => Promise<AppResult<Data>>
}

const abortedResult = () =>
  AppResultFactory.failed(
    new AppError("Aborted", HarmonyMscProcessErrorName.Aborted)
  )

export const flashHarmonyMscRunStep = async <Data>({
  state,
  progress,
  signal,
  onProgress,
  task,
}: FlashHarmonyMscRunStepOptions<Data>): Promise<AppResult<Data>> => {
  if (signal.aborted) {
    return abortedResult()
  }

  onProgress?.({ state, progress })

  const result = await task()

  if (signal.aborted) {
    return abortedResult()
  }

  return result
}
