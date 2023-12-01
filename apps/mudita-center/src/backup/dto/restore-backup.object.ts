/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Backup } from "App/backup/dto/backup.object"

export interface RestoreBackup {
  key: string
  backup: Backup
}
