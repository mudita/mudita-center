/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum BackupProcessStatus {
  PreBackup,
  FilesTransfer,
  SaveFile,
  Done,
  Failed,
}

export enum BackupProcessFileStatus {
  Pending,
  InProgress,
  Done,
}

export enum RestoreProcessStatus {
  PasswordNotRequired,
  PasswordRequired,
  PreRestore,
  FilesTransfer,
  Restoring,
  Done,
  Failed,
}
