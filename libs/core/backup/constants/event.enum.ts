/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum BackupEvent {
  Load = "LOAD_BACKUP_DATA",
  SetBackupData = "SET_BACKUP_DATA",
  CreateBackup = "CREATE_BACKUP",
  RestoreBackup = "RESTORE_BACKUP",
  ReadBackupDeviceDataState = "READ_BACKUP_DEVICE_DATA_STATE",
  ReadRestoreDeviceDataState = "READ_RESTORE_DEVICE_DATA_STATE",
}
