/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { initSerialPort } from "app-serialport/main"
import { BrowserWindow, ipcMain } from "electron"
import { initSql } from "app-sql/main"
import { initNews } from "news/main"
import { initAppHelp } from "help/main"
import { initAppSettings } from "app-settings/main"
import {
  initAppActions,
  initAppFileSystem,
  initAppHttp,
  initAppLogger,
  initJsonStore,
} from "app-utils/main"
import { initAppUpdater } from "app-updater/main"
import { initUsbAccess } from "app-init/main"
import { IpcMockServer } from "e2e-mock/server"

export const initAppLibs = (
  mainWindow: BrowserWindow,
  mockServer: IpcMockServer
) => {
  initAppActions(ipcMain)
  initAppSettings(ipcMain, mockServer)
  initAppUpdater(ipcMain, mainWindow, mockServer)
  initSerialPort(ipcMain, mainWindow)
  initSql(ipcMain)
  initNews(ipcMain, mainWindow)
  initAppHelp(ipcMain)
  initJsonStore(ipcMain)
  initAppHttp(ipcMain)
  initAppLogger(ipcMain)
  initAppFileSystem(ipcMain)
  initUsbAccess(ipcMain, mockServer)
}
