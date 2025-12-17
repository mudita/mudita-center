/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppFileSystemGuardOptions } from "app-utils/models"

export const getIgnoredCrashDumpsLocationDir = (
  deviceId: string
): AppFileSystemGuardOptions => {
  return {
    scopeRelativePath: ["crash-dumps", "harmony", deviceId],
    scope: "userData",
  }
}
export const getIgnoredCrashDumpsLocation = (
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
