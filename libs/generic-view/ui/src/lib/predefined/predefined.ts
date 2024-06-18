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
import {
  aboutDataBox,
  backupCreate,
  backupRestore,
  backupRestoreAvailable,
  importContacts,
  lastBackupDate,
  mcDataMigration,
  overviewOsVersion,
} from "generic-view/models"

export const predefinedComponents = {
  [overviewOsVersion.key]: OverviewOsVersion,
  [aboutDataBox.key]: AboutDataBox,
  [lastBackupDate.key]: LastBackupDate,
  [backupRestoreAvailable.key]: BackupRestoreAvailable,
  [backupCreate.key]: BackupCreate,
  [backupRestore.key]: BackupRestore,
  [importContacts.key]: ImportContacts,
  [mcDataMigration.key]: DataMigration,
}
