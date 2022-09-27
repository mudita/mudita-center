/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { Backup } from "App/backup/dto"
import { BackupError } from "App/backup/constants"
import { BackupPresenter } from "App/backup/presenters"

export class LoadBackupService {
  public loadBackups(backupsPath: string): ResultObject<Backup[] | undefined> {
    try {
      if (!fs.existsSync(backupsPath)) {
        return Result.success([])
      }

      const files = fs.readdirSync(backupsPath)

      return Result.success(
        files.map((file) => BackupPresenter.toBackup(file, backupsPath))
      )
    } catch (error) {
      return Result.failed(
        new AppError(
          BackupError.Load,
          (error as Error)?.message || "Error during reading backups directory"
        )
      )
    }
  }
}
