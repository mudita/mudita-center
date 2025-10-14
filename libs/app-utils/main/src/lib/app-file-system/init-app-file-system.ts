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
  AppFileSystemReadDirOptions,
  AppFileSystemReadFileOptions,
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
    (event, options: AppFileSystemWriteFileOptions) =>
      appFileSystem.writeFile({
        ...options,
        webContentsId: event.sender.id,
      })
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.ReadFile)
  ipcMain.handle(
    AppFileSystemIpcEvents.ReadFile,
    (event, options: AppFileSystemReadFileOptions) =>
      appFileSystem.readFile({ ...options, webContentsId: event.sender.id })
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.ReadDir)
  ipcMain.handle(
    AppFileSystemIpcEvents.ReadDir,
    (event, options: AppFileSystemReadDirOptions) =>
      appFileSystem.readDir({ ...options, webContentsId: event.sender.id })
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.PathExists)
  ipcMain.handle(
    AppFileSystemIpcEvents.PathExists,
    (_, options: AppFileSystemPathExistsOptions) =>
      appFileSystem.pathExists(options)
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.FileStats)
  ipcMain.handle(AppFileSystemIpcEvents.FileStats, (event, options) =>
    appFileSystem.fileStats({ ...options, webContentsId: event.sender.id })
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.CalculateFileCrc32)
  ipcMain.handle(AppFileSystemIpcEvents.CalculateFileCrc32, (event, options) =>
    appFileSystem.calculateFileCrc32({
      ...options,
      webContentsId: event.sender.id,
    })
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.ReadFileChunk)
  ipcMain.handle(AppFileSystemIpcEvents.ReadFileChunk, (event, options) =>
    appFileSystem.readFileChunk({ ...options, webContentsId: event.sender.id })
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.WriteFileChunk)
  ipcMain.handle(AppFileSystemIpcEvents.WriteFileChunk, (event, options) =>
    appFileSystem.writeFileChunk({ ...options, webContentsId: event.sender.id })
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.Extract)
  ipcMain.handle(AppFileSystemIpcEvents.Extract, (event, options) =>
    appFileSystem.extract({ ...options, webContentsId: event.sender.id })
  )
  ipcMain.removeHandler(AppFileSystemIpcEvents.OpenDirectory)
  ipcMain.handle(AppFileSystemIpcEvents.OpenDirectory, (_, options) =>
    appFileSystem.openDirectory(options)
  )
}
