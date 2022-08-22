/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { dialog, FileFilter, OpenDialogOptions } from "electron"
import { AppError } from "App/core/errors"
import { Result, ResultObject } from "App/core/builder"
import { DialogFileSystemError } from "App/file-system/constants"

export class FilesSystemDialogService {
  public async getPaths(
    filters?: FileFilter[],
    properties?: OpenDialogOptions["properties"]
  ): Promise<ResultObject<string[] | undefined>> {
    try {
      const result = await dialog.showOpenDialog({ filters, properties })
      return Result.success(result.filePaths)
    } catch (error) {
      return Result.failed(
        new AppError(
          DialogFileSystemError.GetPath,
          error ? (error as Error).message : "Something went wrong"
        )
      )
    }
  }
}
