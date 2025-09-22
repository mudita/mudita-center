/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import {
  AppFileSystemArchiveOptions,
  AppFileSystemIpcEvents,
  AppFileSystemMkdirOptions,
  AppFileSystemPathExistsOptions,
  AppFileSystemRmOptions,
  AppFileSystemWriteFileOptions,
} from "app-utils/models"
import { AppFileSystemService } from "./app-file-system.service"

export const initAppFileSystem = (
  ipcMain: IpcMain,
  appFileSystem: AppFileSystemService
) => {
  ipcMain.removeHandler(AppFileSystemIpcEvents.Rm)
  ipcMain.handle(
    AppFileSystemIpcEvents.Rm,
    (_, options: AppFileSystemRmOptions) => appFileSystem.rm(options)
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.Mkdir)
  ipcMain.handle(
    AppFileSystemIpcEvents.Mkdir,
    (_, options: AppFileSystemMkdirOptions) => appFileSystem.mkdir(options)
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.Archive)
  ipcMain.handle(
    AppFileSystemIpcEvents.Archive,
    (_, options: AppFileSystemArchiveOptions) => appFileSystem.archive(options)
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.WriteFile)
  ipcMain.handle(
    AppFileSystemIpcEvents.WriteFile,
    (_, options: AppFileSystemWriteFileOptions) =>
      appFileSystem.writeFile(options)
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.PathExists)
  ipcMain.handle(
    AppFileSystemIpcEvents.PathExists,
    (_, options: AppFileSystemPathExistsOptions) =>
      appFileSystem.pathExists(options)
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.FileStats)
  ipcMain.handle(AppFileSystemIpcEvents.FileStats, (_, options) =>
    appFileSystem.fileStats(options)
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.CalculateFileCrc32)
  ipcMain.handle(AppFileSystemIpcEvents.CalculateFileCrc32, (_, options) =>
    appFileSystem.calculateFileCrc32(options)
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.ReadFileChunk)
  ipcMain.handle(AppFileSystemIpcEvents.ReadFileChunk, (_, options) =>
    appFileSystem.readFileChunk(options)
  )
}
