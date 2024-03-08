/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ActionName {
  GetConfig = "api-actions/get-config",
  GetAny = "api-actions/get-any",
  GetMenuConfig = "api-actions/get-menu-config",
  GetOutboxData = "api-actions/get-outbox-data",
  SetMenu = "generic-views/set-menu",
  SetViewLayout = "generic-views/set-view-layout",
  SetViewData = "generic-views/set-view-data",
  ActivateDevice = "generic-views/activate-device",
  DetachDevice = "generic-views/detach-device",
  OpenModal = "generic-modals/open-modal",
  CloseModal = "generic-modals/close-modal",
  CloseAllModals = "generic-modals/close-all-modals",
  ReplaceModal = "generic-modals/replace-modal",
  CloseDomainModals = "generic-modals/close-domain-modals",
  SetBackupProcess = "generic-backups/set-backup-process",
  CleanBackupProcess = "generic-backups/clean-backup-process",
  BackupProcessStatus = "generic-backups/backup-process-status",
  CleanRestoreProcess = "generic-backups/clean-restore-process",
  SetBackupProcessFileStatus = "generic-backups/set-backup-process-file-status",
  CreateBackup = "generic-backups/create-backup",
  RefreshBackupList = "generic-backups/refresh-backup-list",
  GetBackupMetadata = "generic-backups/load-backup-to-restore",
  FileTransferSend = "generic-file-transfer/send",
  PreFileTransferSend = "generic-file-transfer/pre-send",
  ChunkFileTransferSend = "generic-file-transfer/chunk-sent",
  ClearFileTransferSendError = "generic-file-transfer/clear-send-errors",
  PreFileTransferGet = "generic-file-transfer/pre-get",
  FileTransferGet = "generic-file-transfer/get",
  ChunkFileTransferGet = "generic-file-transfer/chunk-get",
  ClearFileTransferGetError = "generic-file-transfer/clear-get-errors",
}
