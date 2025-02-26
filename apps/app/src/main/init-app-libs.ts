/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { initSerialPort } from "app-serialport/main"
import { ipcMain, WebContents } from "electron"
import { initSql } from "app-sql/main"

export const initAppLibs = (webContents: WebContents) => {
  initSerialPort(ipcMain, webContents)
  initSql(ipcMain)
}
