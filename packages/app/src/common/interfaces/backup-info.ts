/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import BackupItemInfo from "Common/interfaces/backup-item-info.interface"

export default interface BackupInfo {
  // List of backups.
  readonly backups: BackupItemInfo[]
}
