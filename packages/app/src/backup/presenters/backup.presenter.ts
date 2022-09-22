/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { join } from "path"
import { statSync } from "fs"
import { Backup } from "App/backup/dto"

export class BackupPresenter {
  static toBackup(file: string, filePath: string): Backup {
    const childFilePath = join(filePath, file)
    const stats = statSync(childFilePath)

    return {
      filePath: childFilePath,
      date: new Date(stats.mtime),
    }
  }
}
