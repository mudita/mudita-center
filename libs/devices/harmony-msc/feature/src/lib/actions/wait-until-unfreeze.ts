/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { flashHarmonyMscParams } from "./flash-harmony-msc/flash-harmony-msc.types"
import { HarmonyMsc, HarmonyMscProcessState } from "devices/harmony-msc/models"
import { AppSerialPort } from "app-serialport/renderer"
import { delay } from "app-utils/common"
import { SerialPortDeviceType } from "app-serialport/models"
import { AppError, AppResult, AppResultFactory } from "app-utils/models"

const POLL_INTERVAL_MS = 500

type FreezeAndReconnectParams = flashHarmonyMscParams & {
  onFrozenState?: HarmonyMscProcessState
}

export const waitUntilUnfreeze = async ({
  device,
  onProgress,
  signal,
  onFrozenState,
}: FreezeAndReconnectParams): Promise<AppResult> => {
  for (;;) {
    const frozen = await AppSerialPort.isFrozen(device.id)

    if (frozen) {
      break
    }

    // `undefined` is not `false`: the main process no longer holds this
    // device, so it will never report itself frozen. Waiting on that answer
    // keeps the flash flow running for as long as the window is open.
    if (frozen === undefined) {
      console.log("[wait-util-unfreeze] Device is gone, nothing to wait for")
      return AppResultFactory.failed(
        new AppError(`Device ${device.id} disconnected before it froze`)
      )
    }

    console.log("[wait-util-unfreeze] Device not frozen yet, waiting...")
    if (signal.aborted) {
      console.log("[wait-util-unfreeze] Aborted before device freeze")
      return AppResultFactory.success()
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
      return AppResultFactory.success()
    }
    await delay(POLL_INTERVAL_MS)
  }

  console.log("[wait-util-unfreeze] Device reconnected")
  return AppResultFactory.success()
}

const isNotReconnected = async (device: HarmonyMsc) => {
  const connectedDevices = await AppSerialPort.getCurrentDevices()
  const foundInConnectedDevices = connectedDevices.some((d) => {
    return d.deviceType === SerialPortDeviceType.Harmony
  })
  // A device the main process no longer holds answers `undefined`, and it is
  // not going to reconnect under the same id either - there is nothing left
  // to wait for.
  return (
    (await AppSerialPort.isFrozen(device.id)) === true &&
    !foundInConnectedDevices
  )
}
