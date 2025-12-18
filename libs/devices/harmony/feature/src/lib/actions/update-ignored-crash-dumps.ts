/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppFileSystem } from "app-utils/renderer"
import { Harmony } from "devices/harmony/models"
import {
  getIgnoredCrashDumpsLocation,
  getIgnoredCrashDumpsLocationDir,
} from "./crash-dumps.helpers"

export const updateIgnoredCrashDumps = async (
  crashDumps: string[],
  device?: Harmony
) => {
  if (!device) {
    throw new Error("No device provided for detectNewCrashDumps")
  }

  const deviceId = device.serialNumber || "unknown-device"
  const ignoredCrashDumpsDir = getIgnoredCrashDumpsLocationDir(deviceId)

  await AppFileSystem.mkdir({
    ...ignoredCrashDumpsDir,
    options: { recursive: true },
  })

  await AppFileSystem.writeFile({
    ...getIgnoredCrashDumpsLocation(deviceId),
    data: { crashDumps },
    options: { writeAsJson: true },
  })
}
