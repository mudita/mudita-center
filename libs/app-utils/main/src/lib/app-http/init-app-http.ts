/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow, IpcMain } from "electron"
import { AppHttpService } from "./app-http.service"
import { AppHttpIpcEvents, AppHttpRequestConfig } from "app-utils/models"
import { MockAppHttpService } from "./mock-app-http.service"

export const initAppHttp = (
  ipcMain: IpcMain,
  mainWindow: BrowserWindow,
  appHttpService: AppHttpService | MockAppHttpService
) => {
  ipcMain.removeHandler(AppHttpIpcEvents.Request)
  ipcMain.handle(
    AppHttpIpcEvents.Request,
    (_, config: AppHttpRequestConfig) => {
      return appHttpService.request({
        ...config,
        onDownloadProgress: ({ event, ...progress }) => {
          mainWindow.webContents.send(AppHttpIpcEvents.OnDownloadProgress, {
            rid: config.rid,
            ...progress,
          })
        },
      })
    }
  )

  ipcMain.removeHandler(AppHttpIpcEvents.Abort)
  ipcMain.handle(AppHttpIpcEvents.Abort, (_, uid: string) => {
    return appHttpService.abort(uid)
  })
}
