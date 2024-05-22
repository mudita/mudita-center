/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum FileManagerServiceEvents {
  SaveFile = "apiservice_file_manager-save-file",
  SaveBackupFile = "apiservice_file_manager-save-backup-file",
  GetBackupPath = "apiservice_file_manager-get-backup-path",
  OpenBackupDirectory = "apiservice_file_manager-open-directory",
  ReadDirectory = "apiservice_file_manager-read-directory",
  ReadBackupDirectory = "apiservice_file_manager-read-backup-directory",
  SecureBackupPassword = "apiservice_file_manager-secure-backup-password",
  ReadFile = "apiservice_file_manager-read-file",
  ClearFile = "apiservice_file_manager-clear-file",
  ReadAndGetFile = "apiservice_file_manager-read-and-get-file",
}
