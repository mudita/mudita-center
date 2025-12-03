/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum HarmonyMscProcessState {
  Idle = "Idle",
  GettingFilesDetails = "GettingFilesDetails",
  DownloadingFiles = "DownloadingFiles",
  UnpackingFiles = "UnpackingFiles",
  FlashingProcess = "FlashingProcess",
  SetupTerminal = "SetupTerminal",
  FinalStep = "FinalStep",
  Restarting = "Restarting",
  Complete = "Complete",
  Failed = "Failed",
}

export enum HarmonyMscProcessErrorName {
  Aborted = "aborted",
  Unknown = "unknown",
}
