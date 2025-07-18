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
  AppFileSystemScopeOptions,
  AppFileSystemWriteOptions,
} from "app-utils/models"
import { AppFileSystemService } from "./app-file-system.service"
import { IpcMockServer } from "e2e-mock/server"
import { E2eMockIpcEvents } from "e2e-mock/models"

export const initAppFileSystem = (
  ipcMain: IpcMain,
  mockServer: IpcMockServer
) => {
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
  ipcMain.removeHandler(AppFileSystemIpcEvents.Write)
  ipcMain.handle(
    AppFileSystemIpcEvents.Write,
    (_, options: AppFileSystemWriteOptions) =>
      AppFileSystemService.write(options)
  )

  if (mockServer.serverEnabled) {
    mockServer.on(
      E2eMockIpcEvents.write,
      (options: AppFileSystemWriteOptions) =>
        AppFileSystemService.write(options)
    )
    mockServer.on(
      E2eMockIpcEvents.read,
      async (options: AppFileSystemScopeOptions) => {
        const result = await AppFileSystemService.read(options)
        mockServer.emit(`${E2eMockIpcEvents.read}_response`, result)
      }
    )
  }
}
