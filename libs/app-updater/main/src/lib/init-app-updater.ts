/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow, IpcMain } from "electron"
import { AppUpdaterService } from "./app-updater.service"
import { AppUpdaterIpcEvents } from "app-updater/models"
import { MockAppUpdaterService } from "./mock-app-updater.service"

export const initAppUpdater = (
  ipcMain: IpcMain,
  mainWindow: BrowserWindow,
  appUpdaterService: AppUpdaterService | MockAppUpdaterService
) => {
  ipcMain.removeHandler(AppUpdaterIpcEvents.Check)
  ipcMain.handle(AppUpdaterIpcEvents.Check, () => {
    return appUpdaterService.check()
  })

  ipcMain.removeHandler(AppUpdaterIpcEvents.Download)
  ipcMain.handle(AppUpdaterIpcEvents.Download, () => {
    return appUpdaterService.download()
  })

  ipcMain.removeHandler(AppUpdaterIpcEvents.Cancel)
  ipcMain.handle(AppUpdaterIpcEvents.Cancel, () => {
    appUpdaterService.cancel()
  })

  appUpdaterService.onDownloadProgress((percent: number) => {
    mainWindow.webContents.send(
      AppUpdaterIpcEvents.UpdateDownloadProgress,
      percent
    )
  })

  ipcMain.removeHandler(AppUpdaterIpcEvents.Install)
  ipcMain.handle(AppUpdaterIpcEvents.Install, () =>
    appUpdaterService.quitAndInstall()
  )
}
