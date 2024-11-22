/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum BackupProcessStatus {
  "PRE_BACKUP",
  "FILES_TRANSFER",
  "SAVE_FILE",
  "DONE",
  "FAILED",
}

export enum BackupProcessFileStatus {
  "PENDING",
  "IN_PROGRESS",
  "DONE",
}
