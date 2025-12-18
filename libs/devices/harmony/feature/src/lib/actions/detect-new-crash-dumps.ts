/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  CrashDumpsData,
  Harmony,
  HarmonyLogsFileList,
  HarmonyLogsResponse,
} from "devices/harmony/models"
import { AppResult, AppResultFactory } from "app-utils/models"
import { AppFileSystem } from "app-utils/renderer"
import { getHarmonyLogs } from "../api/get-harmony-logs"
import { getIgnoredCrashDumpsLocation } from "./crash-dumps.helpers"

export const detectNewCrashDumps = async (
  device?: Harmony
): Promise<AppResult<CrashDumpsData>> => {
  if (!device) {
    throw new Error("No device provided for detectNewCrashDumps")
  }

  const deviceId = device.serialNumber || "unknown-device"

  const ignoredCrashDumpsLocation = getIgnoredCrashDumpsLocation(deviceId)

  const readFileResult = await AppFileSystem.readFile(ignoredCrashDumpsLocation)

  let currentIgnoredCrashDumps: string[] = []

  if (readFileResult.ok) {
    try {
      const data = JSON.parse(readFileResult.data) as { crashDumps?: string[] }
      currentIgnoredCrashDumps = data.crashDumps ?? []
    } catch {
      // ignore JSON parse errors
    }
  }

  const response = await getHarmonyLogs(device, {
    fileList: HarmonyLogsFileList.CrashDumps,
  })

  if (!response.ok) {
    return AppResultFactory.failed()
  }

  const crashDumps = (response.body as HarmonyLogsResponse)?.files || []

  const newCrashDumpExists = crashDumps.some((crashDump) => {
    return !currentIgnoredCrashDumps.includes(crashDump)
  })

  return AppResultFactory.success({ newCrashDumpExists, crashDumps })
}
