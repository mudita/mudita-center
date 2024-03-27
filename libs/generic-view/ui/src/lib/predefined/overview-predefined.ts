/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import OverviewOsVersion from "./overview-os-version"
import AboutDataBox from "./about-data-box"
import LastBackupDate from "./last-backup-date"
import BackupRestoreAvailable from "./backup-restore-available"
import BackupCreate from "./backup/backup-create"
import BackupRestore from "./backup-restore/backup-restore"
import { ImportContacts } from "./import-contacts/import-contacts"

export const predefinedComponents = {
  "overview-os-version": OverviewOsVersion,
  "about-data-box": AboutDataBox,
  "last-backup-date": LastBackupDate,
  "backup-restore-available": BackupRestoreAvailable,
  "backup-create": BackupCreate,
  "backup-restore": BackupRestore,
  "import-contacts": ImportContacts,
}
