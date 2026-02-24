/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppError,
  AppResult,
  AppResultFactory,
  Platform,
} from "app-utils/models"
import { platform } from "app-utils/common"
import { HarmonyMscProcessState } from "devices/harmony-msc/models"
import { AppSerialPort } from "app-serialport/renderer"
import { waitForFlashCompletion } from "../wait-for-flash-completion"
import { flashHarmonyMscParams } from "./flash-harmony-msc.types"
import { waitUntilUnfreeze } from "../wait-until-unfreeze"

const FREEZE_TIMEOUT_MS = 5 * 60_000

const flashHarmonyMacOsCompletionFlow = async (
  params: flashHarmonyMscParams
): Promise<AppResult> => {
  const { device, onProgress, signal } = params

  onProgress?.({
    state: HarmonyMscProcessState.FlashingProcess,
    progress: 100,
  })
  onProgress?.({ state: HarmonyMscProcessState.SetupTerminal })

  AppSerialPort.freeze(device.id, FREEZE_TIMEOUT_MS)

  const isFlashCompleted = await waitForFlashCompletion(device, { signal })

  if (signal.aborted) {
    AppSerialPort.unfreeze(device.id)
    return AppResultFactory.failed(new AppError("Flashing process was aborted"))
  }

  if (!isFlashCompleted) {
    return AppResultFactory.failed(
      new AppError("Flashing process did not complete successfully")
    )
  }
  console.log("Flash completed, waiting for device to freeze and reconnect")

  onProgress?.({ state: HarmonyMscProcessState.Restarting })
  await waitUntilUnfreeze({
    ...params,
    onFrozenState: HarmonyMscProcessState.Complete,
  })

  return AppResultFactory.success()
}

const flashHarmonyWindowsCompletionFlow = async (
  params: flashHarmonyMscParams
): Promise<AppResult> => {
  const { onProgress } = params

  onProgress?.({
    state: HarmonyMscProcessState.FlashingProcess,
    progress: 100,
  })
  onProgress?.({ state: HarmonyMscProcessState.FinalStep })

  AppSerialPort.freeze(params.device.id, FREEZE_TIMEOUT_MS)
  await waitUntilUnfreeze({
    ...params,
    onFrozenState: HarmonyMscProcessState.Complete,
  })

  return AppResultFactory.success()
}

const flashHarmonyLinuxCompletionFlow = async (
  params: flashHarmonyMscParams
): Promise<AppResult> => {
  const { onProgress } = params

  onProgress?.({
    state: HarmonyMscProcessState.FlashingProcess,
    progress: 100,
  })
  onProgress?.({ state: HarmonyMscProcessState.Restarting })

  AppSerialPort.freeze(params.device.id, FREEZE_TIMEOUT_MS)
  await waitUntilUnfreeze({
    ...params,
    onFrozenState: undefined,
  })

  return AppResultFactory.success()
}

export const flashHarmonyCompletionFlow = async (
  params: flashHarmonyMscParams
): Promise<AppResult> => {
  if (platform === Platform.macos) {
    return flashHarmonyMacOsCompletionFlow(params)
  }
  if (platform === Platform.windows) {
    return flashHarmonyWindowsCompletionFlow(params)
  }
  if (platform === Platform.linux) {
    return flashHarmonyLinuxCompletionFlow(params)
  }

  return AppResultFactory.failed(new Error("Unsupported platform"))
}
