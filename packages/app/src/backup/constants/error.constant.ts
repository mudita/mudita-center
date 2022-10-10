/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum BackupError {
  Load = "LOAD_BACKUP_DATA_ERROR",
  CannotGetDeviceInfo = "CANNOT_GET_DEVICE_INFO_ERROR",
  CannotBackupDevice = "CANNOT_BACKUP_DEVICE_ERROR",
  BackupProcessFailed = "BACKUP_PROCESS_FAILED_ERROR",
  BackupDownloadFailed = "BACKUP_DOWNLOAD_FAILED_ERROR",
  BackupInProgress = "BACKUP_IN_PROGRESS_ERROR",
  BackupLocationIsUndefined = "BACKUP_LOCATION_IS_UNDEFINED_ERROR",
  CannotReadBackupFile = "CANNOT_READ_BACKUP_FILE_ERROR",
  CannotUploadBackupToDevice = "CANNOT_UPLOAD_BACKUP_TO_DEVICE_ERROR",
  CannotRestoreBackup = "CANNOT_RESTORE_BACKUP_ERROR",
  RestoreBackupFailed = "RESTORE_BACKUP_FAILED_ERROR",
  CannotReachBackupLocation = "CANNOT_REACH_BACKUP_LOCATION_ERROR",
  CannotGetProcessStatus = "CANNOT_GET_PROCESS_STATUS_ERROR",
  OperationDoesNotMatch = "OPERATION_DOES_NOT_MATCH_ERROR",
  OperationFailed = "OPERATION_FAILED_ERROR",
  OperationTimeout = "OPERATION_TIMEOUT_ERROR",
  DeviceLocked = "DEVICE_LOCKED",
}
