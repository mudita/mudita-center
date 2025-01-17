/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FileStatsServiceError,
  FileStatsServiceEvents,
} from "system-utils/models"
import { IpcEvent } from "Core/core/decorators"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import fs, { Stats } from "fs-extra"

export class FileStats {
  constructor() {}

  @IpcEvent(FileStatsServiceEvents.Get)
  public async getStats(filePath: string): Promise<ResultObject<Stats>> {
    try {
      const stats = await fs.stat(filePath)
      return Result.success(stats)
    } catch (error) {
      return Result.failed(
        new AppError(
          FileStatsServiceError.Get,
          error ? (error as Error).message : undefined
        )
      )
    }
  }
}
