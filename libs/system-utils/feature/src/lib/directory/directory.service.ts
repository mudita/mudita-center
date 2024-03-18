/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { shell } from "electron"
import { IpcEvent } from "Core/core/decorators"
import { DirectoryServiceEvents } from "system-utils/models"
import { Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { GeneralError } from "device/models"

export class Directory {
  constructor() {}

  @IpcEvent(DirectoryServiceEvents.OpenDirectory)
  public async open({ path }: { path: string }) {
    const errorMessage = await shell.openPath(path)
    if (errorMessage) {
      return Result.failed(
        new AppError(GeneralError.InternalError, errorMessage)
      )
    }
    return Result.success(undefined)
  }
}
