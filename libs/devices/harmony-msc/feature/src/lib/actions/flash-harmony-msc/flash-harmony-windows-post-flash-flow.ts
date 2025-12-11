/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppResult, AppResultFactory } from "app-utils/models"
import { HarmonyMscProcessState } from "devices/harmony-msc/models"
import { delay } from "app-utils/common"
import { AppSerialPort } from "app-serialport/renderer"
import { flashHarmonyMscParams } from "./flash-harmony-msc.types"

export const flashHarmonyWindowsPostFlashFlow = async ({
  device,
  onProgress,
  signal: { aborted },
}: flashHarmonyMscParams): Promise<AppResult> => {
  onProgress?.({ state: HarmonyMscProcessState.FlashingProcess, progress: 100 })
  onProgress?.({ state: HarmonyMscProcessState.FinalStep })

  AppSerialPort.freeze(device.id, 5 * 60_000)

  console.log("[flashHarmonyMsc] Waiting for device to disconnect and freeze")
  while (!(await AppSerialPort.isFrozen(device.id))) {
    console.log("[flashHarmonyMsc] Device not frozen yet, waiting...")
    if (aborted) {
      break
    }
    await delay(500)
  }

  // onProgress?.({ state: HarmonyMscProcessState.Restarting })

  console.log(
    "[flashHarmonyMsc] Device is disconnected and frozen, waiting for reconnect"
  )
  onProgress?.({ state: HarmonyMscProcessState.Complete })

  const unlistenDevicesChanged = AppSerialPort.onDevicesChanged(
    async (changes) => {
      if (changes.added.length > 0) {
        console.log("[flashHarmonyMsc] Device reconnected, unfreezing...")
        unlistenDevicesChanged()
        AppSerialPort.unfreeze(device.id) // 5 minutes
      }
    }
  )

  // Wait for device to reconnect and unfreeze
  while (await AppSerialPort.isFrozen(device.id)) {
    console.log("[flashHarmonyMsc] Device still frozen, waiting...")
    if (aborted) {
      unlistenDevicesChanged()
      AppSerialPort.unfreeze(device.id)
      break
    }
    await delay(500)
  }

  AppSerialPort.unfreeze(device.id)
  console.log("[flashHarmonyMsc] Device restarted and unfrozen")

  return AppResultFactory.success()
}
