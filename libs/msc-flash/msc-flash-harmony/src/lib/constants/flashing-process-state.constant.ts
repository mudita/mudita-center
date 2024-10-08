/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum FlashingProcessState {
  Idle = "idle",
  GettingFilesDetails = "getting-files-details",
  DownloadingFiles = "downloading-files",
  UnpackingFiles = "unpacking-files",
  FlashingProcess = "flashing-process",
  Restarting = "restarting-device",
  Completed = "completed",
  Failed = "failed",
}
