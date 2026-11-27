/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { flashHarmonyMscParams } from "./flash-harmony-msc/flash-harmony-msc.types"
import { HarmonyMscProcessState } from "devices/harmony-msc/models"
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

  for (;;) {
    // MSC is a mode the phone leaves for good, so what comes back is a
    // different device under a different id. A Harmony on the list is the
    // flash having worked, and it settles this wait whatever has become of
    // the MSC entry behind it - which is why it is asked first.
    if (await isHarmonyConnected()) {
      break
    }

    const frozen = await AppSerialPort.isFrozen(device.id)

    // Nothing came back and the MSC entry is not held any more, so its
    // freeze ran out. Leaving the loop here would report a phone that never
    // returned as one that reconnected.
    if (frozen === undefined) {
      console.log(
        "[wait-util-unfreeze] Device was forgotten before it returned"
      )
      return AppResultFactory.failed(
        new AppError(
          `Device ${device.id} did not reconnect before its freeze ran out`
        )
      )
    }

    if (!frozen) {
      break
    }

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

const isHarmonyConnected = async () => {
  const connectedDevices = await AppSerialPort.getCurrentDevices()
  return connectedDevices.some((d) => {
    return d.deviceType === SerialPortDeviceType.Harmony
  })
}
