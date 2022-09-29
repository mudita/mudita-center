/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "backup"

export enum IpcBackupEvent {
  LoadBackups = "load-backups",
  CreateBackup = "create-backup",
  RestoreBackup = "restore-backup",
}

export enum IpcBackupRequest {
  LoadBackups = "backup-load-backups",
  CreateBackup = "backup-create-backup",
  RestoreBackup = "backup-restore-backup",
}
