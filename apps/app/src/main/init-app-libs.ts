/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { initSerialPort } from "app-serialport/main"
import { BrowserWindow, ipcMain } from "electron"
import { AppSql, initSql } from "app-sql/main"
import { initNews } from "news/main"
import { AppHelpService, initAppHelp } from "help/main"
import { getAppSettingsService, initAppSettings } from "app-settings/main"
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
  initAppPath,
  initExternalAuthProviders,
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
import { AppMtp, initAppMtp } from "app-mtp/main"

export const initAppLibs = (
  mainWindow: BrowserWindow,
  mockServer: IpcMockServer
) => {
  const appFileSystemGuard = new AppFileSystemGuard(() => {
    const appSettingsService = getAppSettingsService()
    return [appSettingsService.get("user.backupLocation")]
  })
  const appFileSystemService = new AppFileSystemService(appFileSystemGuard)
  const appActionsService = new AppActionsService(appFileSystemGuard)

  const appHttpService = mockServer.serverEnabled
    ? new MockAppHttpService(mockServer, appFileSystemService)
    : new AppHttpService(appFileSystemService)

  const appUpdaterService = mockServer.serverEnabled
    ? new MockAppUpdaterService(mockServer)
    : new AppUpdaterService(mainWindow, appHttpService)

  const helpService = new AppHelpService(appHttpService)

  const appLoggerService = new AppLoggerService(appFileSystemService)

  const appSql = new AppSql(appFileSystemService)
  const appMtp = new AppMtp()

  initAppPath(ipcMain)
  initJsonStore(ipcMain)
  initAppMtp(ipcMain, appMtp)
  initUsbAccess(ipcMain, mockServer)
  initAppSettings(ipcMain, mockServer)
  initSerialPort(ipcMain, mainWindow)
  initAppFileSystem(ipcMain, appFileSystemService)
  initAppHttp(ipcMain, mainWindow, appHttpService)
  initSql(ipcMain, appSql)
  initAppLogger(ipcMain, appLoggerService)
  initAppUpdater(ipcMain, mainWindow, appUpdaterService)
  initAppActions(ipcMain, appActionsService)
  initAppHelp(ipcMain, helpService)
  initNews(ipcMain, mainWindow)
  initExternalAuthProviders(ipcMain, mainWindow)
}
