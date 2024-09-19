/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum FlashingProcessState {
  Idle = "idle",
  GettingFlashingFilesDetails = "getting-flashing-files-details",
  DownloadingFlashingFiles = "downloading-flashing-files",
  UnpackingFlashingFiles = "unpacking-flashing-files",
  FlashingProcess = "flashing-process",
  Restarting = "restarting-device",
  Completed = "completed",
  Failed = "failed",
}
