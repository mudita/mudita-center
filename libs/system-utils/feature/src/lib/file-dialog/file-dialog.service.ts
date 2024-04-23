/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { dialog, OpenDialogOptions } from "electron"
import { IpcEvent } from "Core/core/decorators"
import { FileDialogServiceEvents } from "system-utils/models"
import { Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { GeneralError } from "device/models"

export class FileDialog {
  constructor() {}

  @IpcEvent(FileDialogServiceEvents.SelectSingleFile)
  public openFile({
    options,
  }: { options?: Omit<OpenDialogOptions, "properties"> } = {}) {
    const selectedFile = dialog.showOpenDialogSync({
      properties: ["openFile"],
      title: "Open File",
      filters: [{ name: "All Files", extensions: ["*"] }],
      ...options,
    })

    if (!selectedFile || selectedFile.length === 0) {
      return Result.failed(new AppError(GeneralError.UserCancelled))
    }
    return Result.success(selectedFile[0])
  }
}
