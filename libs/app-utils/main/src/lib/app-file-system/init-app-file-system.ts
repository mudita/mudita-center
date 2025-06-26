/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { AppFileSystemIpcEvents } from "app-utils/models"
import { AppFileSystemService } from "./app-file-system.service"

export const initAppFileSystem = (ipcMain: IpcMain) => {
  ipcMain.handle(AppFileSystemIpcEvents.Rm, (_, options) =>
    AppFileSystemService.rm(options)
  )
}
