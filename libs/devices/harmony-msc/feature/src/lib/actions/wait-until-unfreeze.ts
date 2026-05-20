/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { flashHarmonyMscParams } from "./flash-harmony-msc/flash-harmony-msc.types"
import { HarmonyMsc, HarmonyMscProcessState } from "devices/harmony-msc/models"
import { AppSerialPort } from "app-serialport/renderer"
import { delay } from "app-utils/common"
import { SerialPortDeviceType } from "app-serialport/models"

const POLL_INTERVAL_MS = 500

type FreezeAndReconnectParams = flashHarmonyMscParams & {
  onFrozenState?: HarmonyMscProcessState
}

export const waitUntilUnfreeze = async ({
  device,
  onProgress,
  signal,
  onFrozenState,
}: FreezeAndReconnectParams): Promise<void> => {
  while (!(await AppSerialPort.isFrozen(device.id))) {
    console.log("[wait-util-unfreeze] Device not frozen yet, waiting...")
    if (signal.aborted) {
      console.log("[wait-util-unfreeze] Aborted before device freeze")
      return
    }
    await delay(POLL_INTERVAL_MS)
  }

  console.log(
    "[wait-util-unfreeze] Device is disconnected and frozen, waiting for reconnect"
  )

  if (onFrozenState) {
    onProgress?.({ state: onFrozenState })
  }

  while (await isNotReconnected(device)) {
    if (signal.aborted) {
      console.log("[wait-util-unfreeze] Aborted while waiting for reconnect")
      AppSerialPort.unfreeze(device.id)
      return
    }
    await delay(POLL_INTERVAL_MS)
  }

  console.log("[wait-util-unfreeze] Device reconnected")
}

const isNotReconnected = async (device: HarmonyMsc) => {
  const connectedDevices = await AppSerialPort.getCurrentDevices()
  const foundInConnectedDevices = connectedDevices.some((d) => {
    return d.deviceType === SerialPortDeviceType.Harmony
  })
  return (await AppSerialPort.isFrozen(device.id)) && !foundInConnectedDevices
}
