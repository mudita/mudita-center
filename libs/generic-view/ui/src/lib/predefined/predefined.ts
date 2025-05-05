/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OverviewOsVersion } from "./overview-os-version"
import { AboutDataBox } from "./about-data-box"
import { LastBackupDate } from "./last-backup-date"
import { BackupRestoreAvailable } from "./backup-restore-available"
import { BackupCreate } from "./backup/backup-create"
import { BackupRestore } from "./backup-restore/backup-restore"
import { ImportContacts } from "./import-contacts/import-contacts"
import { DataMigration } from "./data-migration/data-migration"
import { IncomingFeatureInfo } from "./incoming-feature-info"
import { SelectionManager } from "./selection-manager"
import { McContactsSearchResult } from "./contacts/mc-contacts-search-result"
import { FilesManagerUploadProgress } from "./files-manager-upload/files-manager-upload-progress"
import { FilesManagerUploadFinished } from "./files-manager-upload/files-manager-upload-finished"
import { FilesManagerUploadValidationError } from "./files-manager-upload/files-manager-upload-validation-error"
import { EntitiesDeleteError } from "./entities/entities-delete-error"
import { AppInstallationProgress } from "./app-installation/app-installation-progress"
import { AppInstallationError } from "./app-installation/app-installation-error"
import { AppInstallationSuccess } from "./app-installation/app-installation-success"
import { SummaryDeviceVersion } from "./summary-device-version"
import {
  aboutDataBox,
  backupCreate,
  backupRestore,
  backupRestoreAvailable,
  entitiesDeleteError,
  importContacts,
  incomingFeatureInfo,
  lastBackupDate,
  mcContactsSearchResults,
  mcDataMigration,
  mcFilesManagerUploadFinished,
  mcFilesManagerUploadProgress,
  mcFilesManagerUploadValidationError,
  overviewOsVersion,
  selectionManager,
  mcAppInstallationProgress,
  mcAppInstallationError,
  mcAppInstallationSuccess,
  mcSummaryDeviceVersion,
} from "generic-view/models"

export const predefinedComponents = {
  [overviewOsVersion.key]: OverviewOsVersion,
  [aboutDataBox.key]: AboutDataBox,
  [lastBackupDate.key]: LastBackupDate,
  [backupRestoreAvailable.key]: BackupRestoreAvailable,
  [backupCreate.key]: BackupCreate,
  [backupRestore.key]: BackupRestore,
  [entitiesDeleteError.key]: EntitiesDeleteError,
  [importContacts.key]: ImportContacts,
  [mcDataMigration.key]: DataMigration,
  [incomingFeatureInfo.key]: IncomingFeatureInfo,
  [selectionManager.key]: SelectionManager,
  [mcContactsSearchResults.key]: McContactsSearchResult,
  [mcFilesManagerUploadProgress.key]: FilesManagerUploadProgress,
  [mcFilesManagerUploadFinished.key]: FilesManagerUploadFinished,
  [mcFilesManagerUploadValidationError.key]: FilesManagerUploadValidationError,
  [mcAppInstallationProgress.key]: AppInstallationProgress,
  [mcAppInstallationError.key]: AppInstallationError,
  [mcAppInstallationSuccess.key]: AppInstallationSuccess,
  [mcSummaryDeviceVersion.key]: SummaryDeviceVersion,
}
