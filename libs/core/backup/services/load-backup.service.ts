/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { Backup } from "Core/backup/dto"
import { BackupError } from "Core/backup/constants"
import { BackupPresenter } from "Core/backup/presenters"

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
