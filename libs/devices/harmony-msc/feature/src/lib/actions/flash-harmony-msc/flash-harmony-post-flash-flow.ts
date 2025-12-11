/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppError,
  AppResult,
  AppResultFactory,
  Platform,
  platform,
} from "app-utils/models"
import { HarmonyMscProcessState } from "devices/harmony-msc/models"
import { delay } from "app-utils/common"
import { AppSerialPort } from "app-serialport/renderer"
import { waitForFlashCompletion } from "../wait-for-flash-completion"
import { flashHarmonyMscParams } from "./flash-harmony-msc.types"

const FREEZE_TIMEOUT_MS = 5 * 60_000
const POLL_INTERVAL_MS = 500

type FreezeAndReconnectParams = flashHarmonyMscParams & {
  onFrozenState?: HarmonyMscProcessState
}

const freezeUntilReconnect = async ({
  device,
  onProgress,
  signal: { aborted },
  onFrozenState,
}: FreezeAndReconnectParams): Promise<void> => {
  AppSerialPort.freeze(device.id, FREEZE_TIMEOUT_MS)
  console.log("[post-flash-flow] Waiting for device to disconnect and freeze")
  while (!(await AppSerialPort.isFrozen(device.id))) {
    console.log("[post-flash-flow] Device not frozen yet, waiting...")
    if (aborted) {
      console.log("[post-flash-flow] Aborted before device freeze")
      return
    }
    await delay(POLL_INTERVAL_MS)
  }

  console.log(
    "[post-flash-flow] Device is disconnected and frozen, waiting for reconnect"
  )

  if (onFrozenState) {
    onProgress?.({ state: onFrozenState })
  }

  let listenerActive = true

  const unlistenDevicesChanged = AppSerialPort.onDevicesChanged((changes) => {
    if (!listenerActive) return

    if (changes.added.length > 0) {
      console.log("[post-flash-flow] Device reconnected, unfreezing...")
      listenerActive = false
      unlistenDevicesChanged()
      AppSerialPort.unfreeze(device.id)
    }
  })

  try {
    while (await AppSerialPort.isFrozen(device.id)) {
      console.log("[post-flash-flow] Device still frozen, waiting...")
      if (aborted) {
        console.log("[post-flash-flow] Aborted while waiting for reconnect")
        listenerActive = false
        unlistenDevicesChanged()
        AppSerialPort.unfreeze(device.id)
        break
      }
      await delay(POLL_INTERVAL_MS)
    }
  } finally {
    AppSerialPort.unfreeze(device.id)
  }

  console.log("[post-flash-flow] Device restarted and unfrozen")
}

const flashHarmonyMacOsPostFlashFlow = async (
  params: flashHarmonyMscParams
): Promise<AppResult> => {
  const { device, onProgress } = params

  onProgress?.({
    state: HarmonyMscProcessState.FlashingProcess,
    progress: 100,
  })
  onProgress?.({ state: HarmonyMscProcessState.SetupTerminal })

  const isFlashCompleted = await waitForFlashCompletion(device)

  if (!isFlashCompleted) {
    return AppResultFactory.failed(
      new AppError("Flashing process did not complete successfully")
    )
  }

  onProgress?.({ state: HarmonyMscProcessState.Restarting })
  console.log(
    "[post-flash-flow] Freezing device before terminal setup and reconnect"
  )

  await freezeUntilReconnect({
    ...params,
    onFrozenState: HarmonyMscProcessState.Complete,
  })

  return AppResultFactory.success()
}

const flashHarmonyWindowsPostFlashFlow = async (
  params: flashHarmonyMscParams
): Promise<AppResult> => {
  const { onProgress } = params

  onProgress?.({
    state: HarmonyMscProcessState.FlashingProcess,
    progress: 100,
  })
  onProgress?.({ state: HarmonyMscProcessState.FinalStep })

  await freezeUntilReconnect({
    ...params,
    onFrozenState: HarmonyMscProcessState.Complete,
  })

  return AppResultFactory.success()
}

const flashHarmonyLinuxPostFlashFlow = async (
  params: flashHarmonyMscParams
): Promise<AppResult> => {
  const { onProgress } = params

  onProgress?.({
    state: HarmonyMscProcessState.FlashingProcess,
    progress: 100,
  })
  onProgress?.({ state: HarmonyMscProcessState.Restarting })

  await freezeUntilReconnect({
    ...params,
    onFrozenState: undefined,
  })

  return AppResultFactory.success()
}

export const flashHarmonyPostFlashFlow = async (
  params: flashHarmonyMscParams
): Promise<AppResult> => {
  if (platform === Platform.macos) {
    return flashHarmonyMacOsPostFlashFlow(params)
  }
  if (platform === Platform.windows) {
    return flashHarmonyWindowsPostFlashFlow(params)
  }
  if (platform === Platform.linux) {
    return flashHarmonyLinuxPostFlashFlow(params)
  }

  return AppResultFactory.failed(new Error("Unsupported platform"))
}
