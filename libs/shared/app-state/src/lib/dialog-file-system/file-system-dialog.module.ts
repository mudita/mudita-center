/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"
import { getMainAppWindow } from "shared/utils"
import { FileSystemDialogService } from "./file-system-dialog.service"
import { FileSystemDialogController } from "./file-system-dialog.controller"

export class FileSystemDialogModule {
  constructor() {}

  static getControllers() {
    const window = getMainAppWindow() as BrowserWindow
    const filesSystemDialogService = new FileSystemDialogService(window)
    const fileSystemDialogController = new FileSystemDialogController(
      filesSystemDialogService
    )
    return [fileSystemDialogController]
  }
}
