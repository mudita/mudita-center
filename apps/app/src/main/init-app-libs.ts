/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { initSerialPort } from "app-serialport/main"
import { ipcMain, WebContents } from "electron"
import { initSql } from "app-sql/main"
import { initNews } from "news/main"
import { initAppSettings } from "app-settings/main"

export const initAppLibs = (webContents: WebContents) => {
  initAppSettings(ipcMain)
  initSerialPort(ipcMain, webContents)
  initSql(ipcMain)
  initNews(ipcMain, webContents)
}
