/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { initSerialPort } from "app-serialport/main"
import { BrowserWindow, ipcMain } from "electron"
import { initSql } from "app-sql/main"
import { initNews } from "news/main"
import { AppHelpService, initAppHelp } from "help/main"
import {
  getService as getAppSettingsService,
  initAppSettings,
} from "app-settings/main"
import {
  AppActionsService,
  AppFileSystemGuard,
  AppFileSystemService,
  AppHttpService,
  AppLoggerService,
  initAppActions,
  initAppFileSystem,
  initAppHttp,
  initAppLogger,
  initJsonStore,
  MockAppHttpService,
} from "app-utils/main"
import {
  AppUpdaterService,
  initAppUpdater,
  MockAppUpdaterService,
} from "app-updater/main"
import { initUsbAccess } from "app-init/main"
import { IpcMockServer } from "e2e-mock/server"

export const initAppLibs = async (
  mainWindow: BrowserWindow,
  mockServer: IpcMockServer
) => {
  const appSettingsService = await getAppSettingsService(
    mockServer.serverEnabled
  )
  const appFileSystemGuard = new AppFileSystemGuard(appSettingsService)
  const appFileSystem = new AppFileSystemService(appFileSystemGuard)
  const appActionsService = new AppActionsService(appFileSystemGuard)

  const appHttpService = mockServer.serverEnabled
    ? new MockAppHttpService(mockServer, appFileSystem)
    : new AppHttpService(appFileSystem)

  const appUpdaterService = mockServer.serverEnabled
    ? new MockAppUpdaterService(mockServer)
    : new AppUpdaterService(mainWindow, appHttpService)

  const helpService = new AppHelpService(appHttpService)

  const appLoggerService = new AppLoggerService(appFileSystem)

  initAppActions(ipcMain, appActionsService)
  initAppSettings(ipcMain, mockServer)
  initAppUpdater(ipcMain, mainWindow, appUpdaterService)
  initSerialPort(ipcMain, mainWindow)
  initSql(ipcMain)
  initNews(ipcMain, mainWindow)
  initAppHelp(ipcMain, helpService)
  initJsonStore(ipcMain)
  initAppHttp(ipcMain, mainWindow, appHttpService)
  initAppLogger(ipcMain, appLoggerService)
  initAppFileSystem(ipcMain, appFileSystem)
  initUsbAccess(ipcMain, mockServer)
}
