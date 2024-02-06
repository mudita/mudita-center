/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow, dialog, OpenDialogOptions } from "electron"
import { AppError } from "Core/core/errors"
import { Result, ResultObject } from "Core/core/builder"
import { FileSystemDialogError } from "./error.constant"

const defaultOptions: OpenDialogOptions = { filters: [], properties: [] }

export class FileSystemDialogService {
  private lastSelectedPath: string | undefined

  constructor(private mainApplicationWindow: BrowserWindow) {}
  public async getPaths(
    options: OpenDialogOptions = defaultOptions
  ): Promise<ResultObject<string[] | undefined>> {
    try {
      const openDialogOptions = this.getOpenDialogOptions(options)
      const result = await dialog.showOpenDialog(
        this.mainApplicationWindow,
        openDialogOptions
      )
      this.lastSelectedPath = result.filePaths[0]
      return Result.success(result.filePaths)
    } catch (error) {
      return Result.failed(
        new AppError(
          FileSystemDialogError.GetPath,
          error ? (error as Error).message : "Something went wrong"
        )
      )
    }
  }

  private getOpenDialogOptions(options: OpenDialogOptions): OpenDialogOptions {
    if (this.lastSelectedPath === undefined || options.defaultPath) {
      return options
    } else {
      const defaultPath = this.lastSelectedPath
      return {
        ...options,
        defaultPath,
      }
    }
  }
}
