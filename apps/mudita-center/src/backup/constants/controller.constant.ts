/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "backup"

export enum IpcBackupEvent {
  LoadBackups = "backup_load-backups",
  CreateBackup = "backup_create-backup",
  RestoreBackup = "backup_restore-backup",
}
