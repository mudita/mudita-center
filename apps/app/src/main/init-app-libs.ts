/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { initSerialPort } from "app-serialport/main"
import { BrowserWindow, ipcMain } from "electron"
import { initSql } from "app-sql/main"
import { initNews } from "news/main"
import { AppHelpService, initAppHelp } from "help/main"
import { initAppSettings } from "app-settings/main"
import {
  AppHttpService,
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

export const initAppLibs = (
  mainWindow: BrowserWindow,
  mockServer: IpcMockServer
) => {
  const appHttpService = mockServer.serverEnabled
    ? new MockAppHttpService(mockServer)
    : new AppHttpService()

  const appUpdaterService = mockServer.serverEnabled
    ? new MockAppUpdaterService(mockServer)
    : new AppUpdaterService(mainWindow, appHttpService)

  const helpService = new AppHelpService(appHttpService)

  initAppActions(ipcMain)
  initAppSettings(ipcMain, mockServer)
  initAppUpdater(ipcMain, mainWindow, appUpdaterService)
  initSerialPort(ipcMain, mainWindow)
  initSql(ipcMain)
  initNews(ipcMain, mainWindow)
  initAppHelp(ipcMain, helpService)
  initJsonStore(ipcMain)
  initAppHttp(ipcMain, mainWindow, appHttpService)
  initAppLogger(ipcMain)
  initAppFileSystem(ipcMain)
  initUsbAccess(ipcMain, mockServer)
}
