/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum HarmonyOSUpdateStatus {
  Idle = "idle",
  Installing = "installing",
  Restarting = "restarting",
}

export enum HarmonyOSUpdateError {
  Unknown = "unknown",
  AvailabilityCheckFailed = "availability-check-failed",
  DownloadFailed = "download-failed",
  UpdateFailed = "update-failed",
  UpdateAborted = "update-aborted",
  NotEnoughSpace = "not-enough-space",
  BatteryFlat = "battery-flat",
}
