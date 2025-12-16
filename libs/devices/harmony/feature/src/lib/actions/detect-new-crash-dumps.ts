/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Harmony,
  HarmonyLogsFileList,
  HarmonyLogsResponse,
} from "devices/harmony/models"
import { AppFileSystemGuardOptions, AppResultFactory } from "app-utils/models"
import { AppFileSystem } from "app-utils/renderer"
import { getHarmonyLogs } from "../api/get-harmony-logs"

const getIgnoredCrashDumpsLocationDir = (
  deviceId: string
): AppFileSystemGuardOptions => {
  return {
    scopeRelativePath: ["crash-dumps", "harmony", deviceId],
    scope: "userData",
  }
}

const getIgnoredCrashDumpsLocation = (
  deviceId: string
): AppFileSystemGuardOptions => {
  const dir = getIgnoredCrashDumpsLocationDir(deviceId)
  return {
    ...dir,
    scopeRelativePath: [
      ...(dir.scopeRelativePath as string[]),
      "ignored-crash-dumps.json",
    ],
  }
}

export const detectNewCrashDumps = async (device?: Harmony) => {
  if (!device) {
    throw new Error("No device provided for detectNewCrashDumps")
  }

  const deviceId = device.serialNumber || "unknown-device"
  const ignoredCrashDumpsDir = getIgnoredCrashDumpsLocationDir(deviceId)
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
    // fileList: HarmonyLogsFileList.SystemLogs,
  })

  if (!response.ok) {
    return AppResultFactory.failed()
  }

  const crashDumps = (response.body as HarmonyLogsResponse)?.files || []

  await AppFileSystem.mkdir({
    ...ignoredCrashDumpsDir,
    options: { recursive: true },
  })

  await AppFileSystem.writeFile({
    ...ignoredCrashDumpsLocation,
    data: { crashDumps },
    options: { writeAsJson: true },
  })

  const newCrashDumpExists = crashDumps.some((crashDump) => {
    return !currentIgnoredCrashDumps.includes(crashDump)
  })

  return AppResultFactory.success(newCrashDumpExists)
}
