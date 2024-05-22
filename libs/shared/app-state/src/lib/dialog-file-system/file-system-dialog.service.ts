/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow, dialog, OpenDialogOptions } from "electron"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { AppError } from "Core/core/errors"
import { Result, ResultObject } from "Core/core/builder"
import { FileSystemDialogError } from "./error.constant"

const defaultOptions: OpenDialogOptions = {
  title: intl.formatMessage({ id: "component.dialog.title" }),
  filters: [],
  properties: [],
}

export class FileSystemDialogService {
  private lastSelectedPath: string | undefined

  constructor(private mainApplicationWindow: BrowserWindow) {}
  public async getPaths(
    options: OpenDialogOptions = defaultOptions
  ): Promise<ResultObject<string[] | undefined>> {
    try {
      const openDialogOptions = {
        ...defaultOptions,
        ...options,
        defaultPath: options.defaultPath || this.lastSelectedPath
      }
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
}
