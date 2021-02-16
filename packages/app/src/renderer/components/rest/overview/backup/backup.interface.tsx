/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import BackupItemInfo from "Common/interfaces/backup-item-info.interface"

export interface BackupProps {
  lastBackup?: BackupItemInfo
  onBackupCreate: () => void
  onBackupRestore?: () => void
}
