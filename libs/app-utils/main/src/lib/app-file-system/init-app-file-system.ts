/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import {
  AppFileSystemArchiveOptions,
  AppFileSystemIpcEvents,
  AppFileSystemMkdirOptions,
  AppFileSystemRmOptions,
} from "app-utils/models"
import { AppFileSystemService } from "./app-file-system.service"

export const initAppFileSystem = (ipcMain: IpcMain) => {
  ipcMain.removeHandler(AppFileSystemIpcEvents.Rm)
  ipcMain.handle(
    AppFileSystemIpcEvents.Rm,
    (_, options: AppFileSystemRmOptions) => AppFileSystemService.rm(options)
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.Mkdir)
  ipcMain.handle(
    AppFileSystemIpcEvents.Mkdir,
    (_, options: AppFileSystemMkdirOptions) =>
      AppFileSystemService.mkdir(options)
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.Archive)
  ipcMain.handle(
    AppFileSystemIpcEvents.Archive,
    (_, options: AppFileSystemArchiveOptions) =>
      AppFileSystemService.archive(options)
  )
}
