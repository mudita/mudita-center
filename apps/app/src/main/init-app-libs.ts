/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { initSerialPort } from "app-serialport/main"
import { ipcMain, WebContents } from "electron"
import { initSql } from "app-sql/main"
import { initNews } from "news/main"
import { initAppHelp } from "help/main"
import { initAppSettings } from "app-settings/main"
import { initAppActions } from "app-utils/main"
import { initAppUpdater } from "app-utils/main"

export const initAppLibs = (webContents: WebContents) => {
  initAppActions(ipcMain)
  initAppSettings(ipcMain)
  initAppUpdater(ipcMain)
  initSerialPort(ipcMain, webContents)
  initSql(ipcMain)
  initNews(ipcMain, webContents)
  initAppHelp(ipcMain)
}
